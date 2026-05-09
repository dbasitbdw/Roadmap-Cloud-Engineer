import fs from 'fs';

const file = 'src/data.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const p = data.en.platforms.find(x => x.id === 'praktik');

p.title = "Practice Labs - Hands-On";
p.description = "Real deployments · Not just watching · Build your portfolio";

p.praktikGrid[0].sub = "Free tier $300 · 90 days · Console + CLI";
p.praktikGrid[0].list = [
  "FREE Setup GCP account + billing alert",
  "GCP Deploy VM using Compute Engine",
  "GCP Create Cloud Storage bucket + upload file",
  "GCP Deploy static site to Cloud Storage + CDN",
  "GCP Create GKE cluster + deploy container",
  "GCP Setup IAM roles + service account",
  "GCP Cloud Run: deploy Python Flask app",
  "GCP Cloud Monitoring + alerting policy"
];

p.praktikGrid[1].sub = "Free tier 12 months · AWS Console + CLI";
p.praktikGrid[1].list = [
  "FREE Setup AWS account + billing alarm",
  "AWS Launch EC2 instance + SSH login",
  "AWS S3 bucket + static website hosting",
  "AWS Lambda function + API Gateway",
  "AWS RDS setup + connect from EC2",
  "AWS IAM user + policy + MFA",
  "AWS CloudFormation: deploy stack from template",
  "AWS ECS + Fargate: deploy Docker container"
];

p.praktikGrid[2].sub = "Free $200 credit 30 days · Portal + CLI";
p.praktikGrid[2].list = [
  "FREE Setup Azure account + resource group",
  "AZURE Deploy Linux VM + SSH",
  "AZURE Azure Blob Storage + static website",
  "AZURE Azure App Service: deploy web app",
  "AZURE Azure Functions: serverless trigger",
  "AZURE Azure AD: setup user + role assignment",
  "AZURE AKS: deploy Kubernetes cluster",
  "AZURE Azure Monitor + Log Analytics"
];

p.praktikGrid[3].sub = "Local Minikube + Play with K8s (free)";
p.praktikGrid[3].list = [
  "FREE Install Minikube + kubectl locally",
  "K8S Deploy pod + service + expose endpoint",
  "K8S Deployment + ReplicaSet + rolling update",
  "K8S ConfigMap + Secret management",
  "K8S Persistent Volume + PVC",
  "K8S Ingress controller + domain routing",
  "K8S HPA: horizontal pod autoscaler",
  "K8S Namespace + RBAC setup"
];

p.praktikGrid[4].sub = "Master these before applying for jobs";
p.praktikGrid[4].list = [
  "FREE Git + GitHub: branching, PR, merge",
  "FREE Docker: build image + push to registry",
  "FREE Terraform: IaC for GCP/AWS resources",
  "FREE GitHub Actions: simple CI/CD pipeline",
  "FREE Linux CLI: ss, netstat, top, df, journalctl",
  "FREE Python: boto3 (AWS) / google-cloud SDK",
  "FREE Nginx / Caddy: reverse proxy setup",
  "FREE Prometheus + Grafana: monitoring stack"
];

p.praktikGrid[5].sub = "Build this → put on GitHub → write on LinkedIn";
p.praktikGrid[5].list = [
  "PROJECT Static site + CDN + custom domain on GCP",
  "PROJECT Serverless API: Lambda + API GW + DynamoDB",
  "PROJECT 3-tier microservice deploy on Kubernetes",
  "PROJECT Full CI/CD pipeline: GitHub → Docker → Cloud",
  "PROJECT Infrastructure as Code: everything with Terraform",
  "PROJECT Monitoring stack: Prometheus + Grafana + Alert",
  "PROJECT Multi-cloud: same app, deployed on 3 platforms",
  "PROJECT Blog/portfolio site deployed via cloud native"
];

p.milestones[0].title = "Hello Cloud";
p.milestones[0].desc = "Have GCP/AWS account, can login to console, know billing, opened Cloud Shell.";

p.milestones[1].title = "First Deploy";
p.milestones[1].desc = "Have deployed something - VM, static site, or function. Can access results via browser.";

p.milestones[2].title = "Container Ready";
p.milestones[2].desc = "Can build Docker image, push to registry, and deploy container on cloud or Kubernetes.";

p.milestones[3].title = "CI/CD Pipeline";
p.milestones[3].desc = "Git push automatically triggers build + deploy to cloud. Using GitHub Actions or cloud native pipeline.";

p.milestones[4].title = "IaC Ready";
p.milestones[4].desc = "Infrastructure written as code (Terraform/Pulumi). Can destroy + recreate in minutes.";

p.milestones[5].title = "Job-Ready Portfolio";
p.milestones[5].desc = "Minimum 3 projects on GitHub + README documentation. Monitoring works. Can explain to interviewers.";

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Fixed EN translations for Praktik!');
