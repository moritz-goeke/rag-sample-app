param staticSites_rag_sample_app_swa_name string = 'rag-sample-swa'
param storageAccounts_rag_aisearch_docs_storage_name string = 'ragaisearchdocsstorage'
param sites_rag_backend_functions_name string = 'rag-backend-functions'
param storageAccounts_rag_functions_storage_name string = 'ragfunctionsstorage'
param serverfarms_rag_asp_name string = 'asp-rag-sample'
param searchServices_rag_ai_search_name string = 'rag-aisearch'
param accounts_rag_openai_name string = 'rag-openai'


resource accounts_rag_openai_name_resource 'Microsoft.CognitiveServices/accounts@2024-10-01' = {
  name: accounts_rag_openai_name
  location: 'westeurope'
  sku: {
    name: 'S0'
  }
  kind: 'OpenAI'
  properties: {
    apiProperties: {}
    customSubDomainName: accounts_rag_openai_name
    networkAcls: {
      defaultAction: 'Allow'
      virtualNetworkRules: []
      ipRules: []
    }
    publicNetworkAccess: 'Enabled'
  }
}


resource searchServices_rag_ai_search_name_resource 'Microsoft.Search/searchServices@2025-02-01-preview' = {
  name: searchServices_rag_ai_search_name
  location: 'West Europe'
  tags: {
    ProjectType: 'aoai-your-data-service'
  }
  sku: {
    name: 'basic'
  }
  properties: {
    replicaCount: 1
    partitionCount: 1
    endpoint: 'https://${searchServices_rag_ai_search_name}.search.windows.net'
    hostingMode: 'default'
    publicNetworkAccess: 'Enabled'
    networkRuleSet: {
      ipRules: []
      bypass: 'None'
    }
    encryptionWithCmk: {
      enforcement: 'Unspecified'
    }
    disableLocalAuth: false
    authOptions: {
      apiKeyOnly: {}
    }
    disabledDataExfiltrationOptions: []
    semanticSearch: 'standard'
  }
}

resource storageAccounts_rag_aisearch_docs_storage_name_resource 'Microsoft.Storage/storageAccounts@2024-01-01' = {
  name: storageAccounts_rag_aisearch_docs_storage_name
  location: 'westeurope'
  sku: {
    name: 'Standard_ZRS'
    tier: 'Standard'
  }
  kind: 'StorageV2'
  properties: {
    dnsEndpointType: 'Standard'
    defaultToOAuthAuthentication: false
    publicNetworkAccess: 'Enabled'
    allowCrossTenantReplication: false
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    allowSharedKeyAccess: true
    largeFileSharesState: 'Enabled'
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      requireInfrastructureEncryption: false
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}

resource storageAccounts_rag_functions_storage_name_resource 'Microsoft.Storage/storageAccounts@2024-01-01' = {
  name: storageAccounts_rag_functions_storage_name
  location: 'westeurope'
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  kind: 'Storage'
  properties: {
    defaultToOAuthAuthentication: true
    publicNetworkAccess: 'Enabled'
    allowCrossTenantReplication: false
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
  }
}

resource serverfarms_rag_asp_name_resource 'Microsoft.Web/serverfarms@2024-04-01' = {
  name: serverfarms_rag_asp_name
  location: 'West Europe'
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
    size: 'Y1'
    family: 'Y'
    capacity: 0
  }
  kind: 'functionapp'
  properties: {
    perSiteScaling: false
    elasticScaleEnabled: false
    maximumElasticWorkerCount: 1
    isSpot: false
    reserved: false
    isXenon: false
    hyperV: false
    targetWorkerCount: 0
    targetWorkerSizeId: 0
    zoneRedundant: false
  }
}

resource staticSites_rag_sample_app_swa_name_resource 'Microsoft.Web/staticSites@2024-04-01' = {
  name: staticSites_rag_sample_app_swa_name
  location: 'West Europe'
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    repositoryUrl: 'https://github.com/moritz-goeke/rag-azure-sample'
    branch: 'main'
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'GitHub'
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

resource sites_rag_backend_functions_name_resource 'Microsoft.Web/sites@2024-04-01' = {
  name: sites_rag_backend_functions_name
  location: 'West Europe'
  kind: 'functionapp'
  properties: {
    enabled: true
    serverFarmId: serverfarms_rag_asp_name_resource.id
    httpsOnly: true
    publicNetworkAccess: 'Enabled'
  }
}
