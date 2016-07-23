# vim: set syntax=yaml:

# Service
apiVersion: v1
kind: Service
metadata:
  name: accounts-frontend
  labels:
    run: accounts-frontend
    subdomain: accounts
spec:
  type: NodePort
  ports:
  - port: 80 # port to serve service on
    targetPort: 80 # containers port
    protocol: TCP
  selector:
    app: accounts-frontend
  # sessionAffinity: ClientIP

---

# Deployment
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: accounts-frontend
spec:
  replicas: 1
  # pod definition
  template:
    metadata:
      labels:
        app: accounts-frontend
    spec:
      containers:
      - name: accounts-frontend
        image: {{IMAGE_NAME}}
        ports:
        - containerPort: 80
