import * as dotenv from 'dotenv';
import { Configuration, ScanApi, ScansListFilterStateEnum, ScansListFilterProviderTypeEnum } from '../dist/index.js';

// Load environment variables from .env file
dotenv.config();

/**
 * Example: Fetch Prowler Scans using API Key
 * 
 * This example demonstrates how to:
 * 1. Configure the Prowler API client with an API key
 * 2. Fetch a list of scans with various filters
 * 3. Handle responses and errors properly
 */
async function fetchProwlerScans() {
  // Get API key from environment variable
  const apiKey = process.env.PROWLER_API_KEY;
  
  if (!apiKey) {
    console.error('Error: PROWLER_API_KEY environment variable not set');
    console.log('Please set your API key: export PROWLER_API_KEY=your_api_key_here');
    process.exit(1);
  }

  // Configure the API client with your API key
  // Prowler API expects: "Api-Key <key>" not "Bearer <key>"
  const configuration = new Configuration({
    basePath: 'https://api.prowler.com',
    baseOptions: {
      headers: {
        'Authorization': `Api-Key ${apiKey}`,
      },
    },
  });

  // Create an instance of the ScanApi
  const scanApi = new ScanApi(configuration);

  try {
    console.log('Fetching Prowler scans...\n');

    // Fetch scans with optional filters
    const response = await scanApi.scansList({
      // Optional: Filter by scan state
      // filterState: ScansListFilterStateEnum.Completed,
      
      // Optional: Filter by provider type
      // filterProviderType: ScansListFilterProviderTypeEnum.Aws,
      
      // Optional: Include related provider information
      include: ['provider'],
      
      // Optional: Pagination
      pageSize: 10,
      pageNumber: 1,
      
      // Optional: Sort by inserted date (newest first)
      sort: ['-inserted_at'],
    });

    // Display results
    const scans = response.data.data;
    console.log(`Found ${scans?.length || 0} scans\n`);

    if (scans && scans.length > 0) {
      scans.forEach((scan, index) => {
        console.log(`--- Scan ${index + 1} ---`);
        console.log(`ID: ${scan.id}`);
        console.log(`Name: ${scan.attributes?.name}`);
        console.log(`State: ${scan.attributes?.state}`);
        console.log(`Trigger: ${scan.attributes?.trigger}`);
        console.log(`Progress: ${scan.attributes?.progress}%`);
        console.log(`Inserted At: ${scan.attributes?.inserted_at}`);
        
        if (scan.attributes?.started_at) {
          console.log(`Started At: ${scan.attributes.started_at}`);
        }
        
        if (scan.attributes?.completed_at) {
          console.log(`Completed At: ${scan.attributes.completed_at}`);
        }
        
        if (scan.attributes?.duration) {
          console.log(`Duration: ${scan.attributes.duration}s`);
        }
        
        if (scan.attributes?.unique_resource_count) {
          console.log(`Resources: ${scan.attributes.unique_resource_count}`);
        }
        
        console.log('');
      });
    } else {
      console.log('No scans found.');
    }

  } catch (error: any) {
    console.error('Error fetching scans:');
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(`Status: ${error.response.status}`);
      console.error(`Message: ${error.response.data?.message || error.message}`);
      
      if (error.response.status === 401) {
        console.error('\nAuthentication failed. Please check your API key.');
      } else if (error.response.status === 403) {
        console.error('\nAccess forbidden. Please check your permissions.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server');
      console.error(error.message);
    } else {
      // Something happened in setting up the request
      console.error(error.message);
    }
    
    process.exit(1);
  }
}

// Run the example
fetchProwlerScans();

