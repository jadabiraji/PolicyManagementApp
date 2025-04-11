# Deployment Guide – Policy Management Application

## 1. Preparation for Deployment

### 1.1 Commit Your Code to GitHub

Before deploying, ensure that all changes have been committed to your GitHub repository:

```bash
git add .
git commit -m "Final version for deployment"
git push origin main
```

---

### 1.2 Configure Jenkins (CI/CD) or Other Pipeline Tools

Use Jenkins to automate your deployment process.

Steps:
- Install Jenkins (if not already installed).
- Set up a Jenkins pipeline that watches your GitHub repository.
- Configure Jenkins to build and deploy both frontend and backend using a `Jenkinsfile`.

Example `Jenkinsfile`:

```groovy
pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-repository-link.git'
            }
        }

        stage('Install Dependencies - Backend') {
            steps {
                dir('PolicyManagementApp/PolicyManagement.API') {
                    script {
                        sh 'dotnet restore'
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('PolicyManagementApp/PolicyManagement.API') {
                    script {
                        sh 'dotnet build --configuration Release'
                    }
                }
            }
        }

        stage('Publish Backend') {
            steps {
                dir('PolicyManagementApp/PolicyManagement.API') {
                    script {
                        sh 'dotnet publish --configuration Release --output ./publish'
                    }
                }
            }
        }

        stage('Install Dependencies - Frontend') {
            steps {
                dir('PolicyManagementApp/policy-management-ui') {
                    script {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('PolicyManagementApp/policy-management-ui') {
                    script {
                        sh 'ng build --prod'
                    }
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                    sh 'az webapp up --name policy-management-backend --resource-group policy-management-rg'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                script {
                    sh 'netlify deploy --prod'
                }
            }
        }
    }
}
```

---

## 2. Deploying the Backend (ASP.NET Core) to Azure

### 2.1 Set Up Azure App Service for Backend

To deploy the backend API to Azure:

1. Go to [Azure Portal](https://portal.azure.com).
2. Navigate to **App Services** > **Add**.
3. Fill in the app creation form:
   - Subscription and Resource Group
   - Name your app (e.g., `policy-management-backend`)
   - Runtime Stack: **.NET 6** (or your target version)
   - Choose the region closest to you

### 2.2 Set Up the Database Connection

Go to **App Service > Configuration > Application settings**, and set the following:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=your-sql-server;Database=PolicyManagementDb;User Id=your-username;Password=your-password;"
}
```

### 2.3 Deploy the Backend Manually (Using Azure CLI)

```bash
az webapp up --name policy-management-backend --resource-group policy-management-rg
```

---

## 3. Deploying the Frontend (Angular) to Netlify or Vercel

### 3.1 Deploy Angular Application to Netlify

#### Install Netlify CLI:

```bash
npm install netlify-cli -g
```

#### Configure and Deploy:

```bash
netlify init
netlify deploy --prod
```

#### Setup Redirects for Angular Routing (Optional):

Create a `_redirects` file in the `src` folder of your Angular project:

```
/*    /index.html   200
```

---

### 3.2 Deploy Angular Application to Vercel

#### Install Vercel CLI:

```bash
npm install -g vercel
```

#### Deploy the App:

```bash
vercel
```

Follow the CLI prompts to link and deploy the app.

---

## 4. Configuring Azure (Optional for CI/CD)

### 4.1 Set Up Continuous Deployment with GitHub Actions

1. In your GitHub repository, go to **Actions**.
2. Select a template for **Azure Web App** deployment or create your own workflow.
3. Make sure it builds and deploys both frontend and backend on push to `main`.

### 4.2 Link Azure and GitHub

1. In Azure Portal, go to your **App Service**.
2. Open **Deployment Center**.
3. Set **GitHub** as the source and link your repository and branch.

### 4.3 Monitor the Deployment

Check the **Deployment Center** for build logs and deployment status. Any errors will be shown in the log output.

---