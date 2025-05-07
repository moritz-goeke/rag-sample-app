# RAG Sample App

This project demonstrates a **Retrieval-Augmented Generation (RAG)** architecture implemented using **Microsoft Azure** services. The application combines **Large Language Models (LLMs)** with **context-based document retrieval** to provide users with accurate, domain-specific answers to their questions. It showcases how Azure services can be leveraged to build scalable, secure, and maintainable AI-powered applications.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Setup and Deployment](#setup-and-deployment)
6. [Folder Structure](#folder-structure)
7. [How It Works](#how-it-works)
8. [Contributing](#contributing)

---

## Overview

The **RAG Sample App** is a chat-based application that allows users to ask questions and receive answers enriched with context from internal documents. The app uses **Azure AI Search** to retrieve relevant document passages and **Azure OpenAI** to generate responses based on the retrieved content.

---

## Architecture

![RAG drawio](https://github.com/user-attachments/assets/a41dc472-32ab-4664-841a-054b9e843faa)

The application is built using the following Azure services:

- **Azure Static Web Apps**: Hosts the frontend, providing an interactive chat interface for users.
- **Azure Functions**: Handles serverless business logic and orchestrates communication between the user, search, and AI.
- **Azure AI Search**: Performs semantic searches on an index of documents stored in **Azure Blob Storage**.
- **Azure OpenAI Service**: Generates contextual answers based on the retrieved content.

---

## Features

- **Interactive Chat Interface**: Users can ask questions and receive AI-generated answers.
- **Document Retrieval**: Retrieves relevant passages from internal documents using Azure AI Search.
- **Contextual Answer Generation**: Combines user queries with retrieved content to generate precise answers.
- **Scalable and Serverless**: Built on Azure's serverless infrastructure for scalability and cost-efficiency.
- **Customizable Settings**: Allows fine-tuning of AI model parameters like temperature and top-p.

---

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **Material-UI**: For styling and components.
- **Vite**: For fast development and build tooling.

### Backend

- **Azure Functions**: For serverless API endpoints.
- **Azure AI Search**: For document retrieval.
- **Azure OpenAI**: For generating AI responses.

---

## Setup and Deployment

### Prerequisites

- **Node.js** (v16 or later)
- **Azure CLI**
- **Azure Functions Core Tools**
- **Git**

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/moritz-goeke/rag-azure-sample.git
   cd rag-sample-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Frontend Locally**:

   Navigate to the frontend folder and start the development server:

   ```bash
   cd frontend
   npm run dev
   ```

4. **Deploy to Azure**:

   Use the provided Bicep/ARM templates to deploy the required Azure resources:

   ```bash
   az deployment group create --resource-group <your-resource-group> --template-file azuredeploy.bicep
   ```

5. **Deploy Azure Function Code**:

   - Navigate to the `backend` folder and deploy the Azure Function code to your Function App:

     ```bash
     cd backend
     func azure functionapp publish <your-function-app-name>
     ```

   - Ensure the Function App is connected to the Static Web App as `api/backend`.

   - Set all required environment variables in the Azure Function App. You can configure these in the Azure Portal under the "Configuration" section of your Function App.

6. **Configure Azure AI Search**:

   To use Azure AI Search, set up the following components:

   - **Blob Storage**: Use the deployed blob storage as a data source and upload your documents.
   - **Index**: Define the structure of the searchable data.
   - **Skillset**: Enrich the data during indexing with AI-powered capabilities.
   - **Indexer**: Automate the process of importing data into the index.

   I strongly recommend to use the **[Import Data Wizard](https://learn.microsoft.com/en-us/azure/search/search-import-data-portal)** to import and index your data (also optionally with vectorization). After completing the wizard, the resources above will be created automatically according to your settings.

   Else, very basic sample JSON configuration files for these components are located in the `rag-config` folder. Use the Azure Portal to create and configure them. Finally, run the indexer to populate the index.
   To ensure the indexer functions correctly, update the `"dataSourceName"` field in the indexer configuration file to match the name of your Azure Blob Storage data source. For example:

   ```json
   "dataSourceName": "<azureblob-datasource>"
   ```

   Replace `<azureblob-datasource>` with the actual name of your data source in Azure Blob Storage.

---

## Folder Structure

```plaintext
rag-sample-app/
├── src/                     # Frontend source code
│   ├── components/          # Reusable React components
│   ├── pages/               # Application pages (Chat, About)
│   ├── assets/              # Static assets (images, logos)
│   └── index.css            # Global styles
├── backend/                 # Backend source code
│   ├── src/                 # Azure Functions
│   ├── host.json            # Azure Functions host configuration
│   └── local.settings.json  # Local environment variables
├── arm-template/            # Azure resource deployment templates
├── staticwebapp.config.json # Static Web App configuration
├── package.json             # Frontend dependencies and scripts
└── README.md                # Project documentation
```

---

## How It Works

### RAG Flow

#### User Query

1. The user sends a question via the chat interface.
2. The frontend sends the query to an Azure Function via a REST API.

#### Document Retrieval

1. The Azure Function queries Azure AI Search for relevant document passages.
2. The search results are returned to the function.

#### Answer Generation

1. The Azure Function combines the user query with the retrieved passages.
2. The enriched input is sent to Azure OpenAI for answer generation.

#### Response Delivery

1. The generated answer is sent back to the frontend.
2. The chat interface displays the answer to the user.

## Important Notes on Production Deployment

This template is designed primarily for development and as a baseline for building your application. Before deploying to a production environment, consider the following improvements to enhance security and reliability:

1. **Use Managed Identities**: Replace hardcoded credentials with Azure Managed Identities to securely access Azure resources without storing secrets in your code.

2. **Leverage Azure Key Vault**: Store sensitive information such as API keys, connection strings, and other secrets in Azure Key Vault. Update your application to retrieve these secrets securely at runtime.

3. **Review and Update Configuration Settings**: Ensure that settings such as CORS policies, authentication mechanisms, and logging levels are configured appropriately for production.

4. **Enable Network Security**: Use Virtual Networks (VNets), private endpoints, and firewalls to restrict access to your Azure resources.

5. **Monitor and Scale**: Implement Azure Monitor and Application Insights for observability. Configure autoscaling rules to handle varying workloads efficiently.

6. **Harden Azure Functions**: Restrict access to your Azure Functions using IP restrictions and enable authentication with Azure Active Directory (AAD).

7. **Audit and Compliance**: Regularly review your deployment for compliance with organizational and regulatory requirements.

By addressing these considerations, you can ensure that your application is secure, scalable, and ready for production use.
