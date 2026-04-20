# 📊 Monitoring Debugging Log: Prometheus & Grafana

This document chronicles the debugging process to get the observability stack working for the Game Library Manager in a Kubernetes (Minikube + Docker Desktop) environment.

## 🚀 Final Working State
- **Prometheus**: Running in `monitoring` namespace, scraping API via static config and Nodes via cAdvisor.
- **Grafana**: Running in `monitoring` namespace, using Prometheus as a data source.
- **Access**: Via `kubectl port-forward` (local ports 9090 and 3000).
- **Persistence**: Prometheus metrics stored via `PersistentVolumeClaim`.
- **API**: Exposing metrics via `/actuator/prometheus` on port 8080.

---

## 🛠️ Debugging Timeline

### Phase 1: Namespace & Connectivity
**Issue**: Prometheus was not discovering services.
- **Discovery**: Services were in `gamelibrarymanager` namespace, but Prometheus was in `monitoring`.
- **Attempt**: Tried using Kubernetes pod discovery.
- **Failure**: Services were accidentally applied to the `default` namespace, causing `SVC_NOT_FOUND` and port conflicts (`30090` already allocated).
- **Solution**: 
    1. Deleted orphaned services from `default` namespace.
    2. Created a dedicated `services.yaml` in the `monitoring` namespace.
    3. Added necessary **RBAC (ClusterRole & Binding)** so Prometheus had permission to list pods across the cluster.

### Phase 2: Host Access (The "Docker Desktop" Trap)
**Issue**: `http://192.168.49.2:30090` (NodePort) was not accessible from the browser.
- **Cause**: Docker Desktop for Windows handles networking differently; the Minikube IP is often unreachable directly via NodePort.
- **Solution**: Switched to `kubectl port-forward svc/prometheus-service -n monitoring 9090:9090`. This creates a stable tunnel to `localhost:9090`.

### Phase 3: The "No Data" Mystery
**Issue**: Prometheus was running, but Grafana showed no data.
- **Cause A (Metrics Source)**: CPU/Memory metrics require cAdvisor.
    - **Fix**: Added a `kubernetes-nodes` scrape job to the Prometheus config.
- **Cause B (Label Mismatch)**: The dashboard looked for a label `service`, but Prometheus had `__meta_kubernetes_pod_label_io_kompose_service`.
    - **Fix**: Added a `replace` relabeling rule to map the metadata label to a clean `service` label.

### Phase 4: Grafana JSON Serialization
**Issue**: Importing the dashboard JSON failed with `JS Serialization failed`.
- **Cause**: Double quotes inside the Prometheus queries (`"api|ui"`) were breaking the JSON structure.
- **Attempt**: Tried escaping with backslashes (`"`), but the write tool stripped them.
- **Solution**: Changed the Prometheus regex to use **single quotes** (`'api|ui'`), which is valid in both JSON and PromQL.

### Phase 5: The HTTP 500 Error
**Issue**: Prometheus targets showed as **DOWN** with HTTP 500.
- **Cause A (Port/Path)**: Prometheus defaults to port 80 and path `/metrics`. The API is on port 8080 and path `/actuator/prometheus`.
    - **Fix**: Updated Prometheus config to use `static_configs` targeting `api.gamelibrarymanager.svc.cluster.local:8080` and `metrics_path: /actuator/prometheus`.
- **Cause B (Spring Boot Security)**: The `/actuator/prometheus` endpoint was not exposed in the API.
    - **Fix**: Updated `application.yml` to include `prometheus` in `management.endpoints.web.exposure.include`.

### Phase 6: The Crash Loop
**Issue**: After updating the API, pods started crashing (`Ready 0/1`).
- **Cause**: Kubernetes Liveness/Readiness probes were killing the pod because it took ~20-30s to boot (Hibernate/Flyway initialization), but the probe timeout was too aggressive.
- **Solution**: Increased `initialDelaySeconds` from 20s to **60s** in `api-deployment.yaml`.

### Phase 7: Persistence
**Issue**: Metrics were lost on pod restart.
- **Solution**: Implemented a `PersistentVolumeClaim` (PVC) of 5Gi and mounted it to `/prometheus` in the deployment, adding `fsGroup: 2000` to handle volume permissions.

---

## 📝 Lessons Learned
1. **Liveness Probes**: Always give Spring Boot apps enough `initialDelaySeconds` to account for JPA/Flyway startup.
2. **Docker Desktop Networking**: Forget `NodePort` on Windows; `kubectl port-forward` is the most reliable way to access services.
3. **Actuator Exposure**: `spring-boot-starter-actuator` is not enough; you must explicitly expose the `prometheus` endpoint in your config.
4. **JSON Quoting**: Use single quotes for internal strings in JSON-exported Prometheus queries to avoid escaping nightmares.
