import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));

const praktikEn = data.en.platforms.find(p => p.id === 'praktik');

praktikEn.title = "Hands-On Practice Labs";
praktikEn.description = "Actual deployment · Not just watching · Build your portfolio";

const translations = {
  "Free tier $300 · 90 hari · Console + CLI": "Free tier $300 · 90 days · Console + CLI",
  "FREESetup GCP account + billing alert": "FREESetup GCP account + billing alert",
  "GCPDeploy VM pakai Compute Engine": "GCPDeploy VM using Compute Engine",
  "GCPBuat Cloud Storage bucket + upload file": "GCPCreate Cloud Storage bucket + upload file",
  "GCPDeploy static site ke Cloud Storage + CDN": "GCPDeploy static site to Cloud Storage + CDN",
  "GCPBuat GKE cluster + deploy container": "GCPCreate GKE cluster + deploy container",
  "GCPSetup IAM roles + service account": "GCPSetup IAM roles + service account",
  "GCPCloud Run: deploy Python Flask app": "GCPCloud Run: deploy Python Flask app",
  "GCPCloud Monitoring + alerting policy": "GCPCloud Monitoring + alerting policy",

  "Free tier 12 bulan · AWS Console + CLI": "Free tier 12 months · AWS Console + CLI",
  "FREESetup AWS account + billing alarm": "FREESetup AWS account + billing alarm",
  "AWSLaunch EC2 instance + SSH masuk": "AWSLaunch EC2 instance + SSH login",
  "AWSS3 bucket + static website hosting": "AWSS3 bucket + static website hosting",
  "AWSLambda function + API Gateway": "AWSLambda function + API Gateway",
  "AWSRDS setup + connect dari EC2": "AWSRDS setup + connect from EC2",
  "AWSIAM user + policy + MFA": "AWSIAM user + policy + MFA",
  "AWSCloudFormation: deploy stack dari template": "AWSCloudFormation: deploy stack from template",
  "AWSECS + Fargate: deploy Docker container": "AWSECS + Fargate: deploy Docker container",

  "Free $200 kredit 30 hari · Portal + CLI": "Free $200 credit 30 days · Portal + CLI",
  "FREESetup Azure account + resource group": "FREESetup Azure account + resource group",
  "AZUREDeploy Linux VM + SSH": "AZUREDeploy Linux VM + SSH",
  "AZUREAzure Blob Storage + static website": "AZUREAzure Blob Storage + static website",
  "AZUREAzure App Service: deploy web app": "AZUREAzure App Service: deploy web app",
  "AZUREAzure Functions: serverless trigger": "AZUREAzure Functions: serverless trigger",
  "AZUREAzure AD: setup user + role assignment": "AZUREAzure AD: setup user + role assignment",
  "AZUREAKS: deploy Kubernetes cluster": "AZUREAKS: deploy Kubernetes cluster",
  "AZUREAzure Monitor + Log Analytics": "AZUREAzure Monitor + Log Analytics",

  "Minikube lokal + Play with K8s (free)": "Local Minikube + Play with K8s (free)",
  "FREEInstall Minikube + kubectl di lokal": "FREEInstall Minikube + kubectl locally",
  "K8SDeploy pod + service + expose endpoint": "K8SDeploy pod + service + expose endpoint",
  "K8SDeployment + ReplicaSet + rolling update": "K8SDeployment + ReplicaSet + rolling update",
  "K8SConfigMap + Secret management": "K8SConfigMap + Secret management",
  "K8SPersistent Volume + PVC": "K8SPersistent Volume + PVC",
  "K8SIngress controller + domain routing": "K8SIngress controller + domain routing",
  "K8SHPA: horizontal pod autoscaler": "K8SHPA: horizontal pod autoscaler",
  "K8SNamespace + RBAC setup": "K8SNamespace + RBAC setup",

  "Kuasai ini dulu sebelum apply kerja": "Master these before applying for jobs",
  "FREEGit + GitHub: branching, PR, merge": "FREEGit + GitHub: branching, PR, merge",
  "FREEDocker: build image + push ke registry": "FREEDocker: build image + push to registry",
  "FREETerraform: IaC buat GCP/AWS resource": "FREETerraform: IaC for GCP/AWS resources",
  "FREEGitHub Actions: CI/CD pipeline sederhana": "FREEGitHub Actions: simple CI/CD pipeline",
  "FREELinux CLI: ss, netstat, top, df, journalctl": "FREELinux CLI: ss, netstat, top, df, journalctl",
  "FREEPython: boto3 (AWS) / google-cloud SDK": "FREEPython: boto3 (AWS) / google-cloud SDK",
  "FREENginx / Caddy: reverse proxy setup": "FREENginx / Caddy: reverse proxy setup",
  "FREEPrometheus + Grafana: monitoring stack": "FREEPrometheus + Grafana: monitoring stack",

  "Build ini → taruh di GitHub → tulis di LinkedIn": "Build this → put on GitHub → write on LinkedIn",
  "PROJECTStatic site + CDN + custom domain di GCP": "PROJECTStatic site + CDN + custom domain on GCP",
  "PROJECTServerless API: Lambda + API GW + DynamoDB": "PROJECTServerless API: Lambda + API GW + DynamoDB",
  "PROJECTMicroservice 3-tier deploy di Kubernetes": "PROJECT3-tier microservice deploy on Kubernetes",
  "PROJECTCI/CD pipeline full: GitHub → Docker → Cloud": "PROJECTFull CI/CD pipeline: GitHub → Docker → Cloud",
  "PROJECTInfrastructure as Code: semua pakai Terraform": "PROJECTInfrastructure as Code: everything with Terraform",
  "PROJECTMonitoring stack: Prometheus + Grafana + Alert": "PROJECTMonitoring stack: Prometheus + Grafana + Alert",
  "PROJECTMulti-cloud: sama app, deploy di 3 platform": "PROJECTMulti-cloud: same app, deployed on 3 platforms",
  "PROJECTBlog/portfolio site deploy pakai cloud native": "PROJECTBlog/portfolio site deployed via cloud native",

  "Hello Cloud": "Hello Cloud",
  "Udah punya akun GCP/AWS, bisa login console, tau billing, pernah buka Cloud Shell.\n                 ": "Have GCP/AWS account, can login to console, know billing, opened Cloud Shell.",
  "First Deploy": "First Deploy",
  "Udah pernah deploy sesuatu - VM, static site, atau function. Bisa akses hasilnya dari\n                browser.  ": "Have deployed something - VM, static site, or function. Can access results via browser.",
  "Container Ready": "Container Ready",
  "Udah bisa build Docker image, push ke registry, dan deploy container di cloud atau\n                Kubernetes.  ": "Can build Docker image, push to registry, and deploy container on cloud or Kubernetes.",
  "CI/CD Pipeline": "CI/CD Pipeline",
  "Git push otomatis trigger build + deploy ke cloud. Pakai GitHub Actions atau cloud\n                native pipeline.  ": "Git push automatically triggers build + deploy to cloud. Using GitHub Actions or cloud native pipeline.",
  "IaC Ready": "IaC Ready",
  "Infrastructure dituliskan sebagai kode (Terraform/Pulumi). Bisa destroy + recreate\n                dalam menit.  ": "Infrastructure written as code (Terraform/Pulumi). Can destroy + recreate in minutes.",
  "Porto Siap Kerja": "Job-Ready Portfolio",
  "Minimal 3 project di GitHub + dokumentasi README. Monitoring jalan. Bisa explain ke\n                interviewer.  ": "Minimum 3 projects on GitHub + README documentation. Monitoring works. Can explain to interviewers."
};

praktikEn.praktikGrid.forEach(g => {
  if (translations[g.sub]) g.sub = translations[g.sub];
  g.list = g.list.map(item => translations[item] || item);
});

praktikEn.milestones.forEach(m => {
  if (translations[m.title]) m.title = translations[m.title];
  if (translations[m.desc]) m.desc = translations[m.desc];
});

fs.writeFileSync('src/data.json', JSON.stringify(data, null, 2));
