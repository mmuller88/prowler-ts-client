# Prowler API Client

A TypeScript client library for the Prowler Cloud API, generated from the OpenAPI specification <https://api.prowler.com/api/v1/docs>.

## Features

- 🚀 Type-safe API client for Prowler Cloud services
- 📚 Complete TypeScript type definitions
- 🔍 Automatically generated from OpenAPI specification
- 🔄 Axios-based HTTP client with configurable options
- 💡 Easy to use, with a simple and intuitive API

## Installation

```bash
# Clone this repository and navigate to the client directory
cd prowler-ts-client

# Install dependencies
npm install

# Generate the API client from the OpenAPI spec
npm run generate

# Build the TypeScript code
npm run build
```

### Available Scripts

- `npm run generate`: Generate API client from OpenAPI spec
- `npm run update-client`: Update client.ts with generated API clients
- `npm run build`: Build the TypeScript code
- `npm run clean`: Remove build output
- `npm run example:fetch-scans`: Run example to fetch Prowler scans

## Publishing to NPM

This package is automatically published to NPM when a new GitHub release is created.

### Setup NPM Token

1. Generate an NPM access token at [npmjs.com](https://www.npmjs.com/settings/tokens)
2. Add the token as `NPM_TOKEN` secret in GitHub repository settings
   - Go to: Settings → Secrets and variables → Actions → New repository secret

### Release Process

1. Update version and commit changes (following semantic versioning)
2. Create and push git tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. Create GitHub release from the tag
4. GitHub Actions will automatically build and publish to NPM

### Semantic Versioning

Use conventional commit format for clear version management:
- `fix:` → patch version (0.0.x)
- `feat:` → minor version (0.x.0)
- `BREAKING CHANGE:` → major version (x.0.0)

Example commits:
```bash
git commit -m "fix: resolve authentication issue"
git commit -m "feat: add new scan filtering options"
git commit -m "feat!: redesign API client interface"
```

## Usage

### Authentication

The Prowler API uses API key authentication with the format `Api-Key <key>`. Get your API key from [Prowler Cloud](https://app.prowler.com).

### Basic Example: Fetching Scans

```typescript
import { Configuration, ScanApi } from 'prowler-api-client';

// Configure with API key
const config = new Configuration({
  basePath: 'https://api.prowler.com',
  baseOptions: {
    headers: {
      'Authorization': `Api-Key ${your_api_key}`,
    },
  },
});

// Create API instance
const scanApi = new ScanApi(config);

// Fetch scans
const response = await scanApi.scansList({
  pageSize: 10,
  sort: ['-inserted_at'],
});

console.log(response.data);
```

## Examples

The `examples/` directory contains complete working examples:

### Fetch Prowler Scans

Location: `examples/fetch-scans.ts`

Demonstrates:

- API key authentication
- Fetching scans with filters
- Pagination
- Error handling
- TypeScript types

**Setup:**

1. Set your API key:

```bash
export PROWLER_API_KEY=your_api_key_here
```

1. Run the example:

```bash
npm run example:fetch-scans
```

**Available filters:**

- Filter by state: `completed`, `executing`, `failed`, etc.
- Filter by provider: `aws`, `azure`, `gcp`, etc.
- Include provider details
- Pagination and sorting

See the example file for detailed usage and all available options.
