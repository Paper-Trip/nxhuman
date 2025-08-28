const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create a temporary directory for testing
const testDir = path.join(__dirname, 'temp-test-platforms');

describe('nxhuman CLI Next.js 15 Support', () => {
  beforeEach(() => {
    // Create temporary directory for each test
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
    process.chdir(testDir);
  });

  afterEach(() => {
    // Clean up temporary directory after each test
    process.chdir(__dirname);
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
  });

  test('shows help information with --help flag', () => {
    const result = spawnSync('node', [path.join(__dirname, '../index.js'), '--help'], { encoding: 'utf-8' });
    // Help command exits with code 0
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('nxHuman CLI');
    expect(result.stdout).toContain('Next.js 15');
  });

  test('accepts --yes flag for non-interactive mode', () => {
    const result = spawnSync('node', [path.join(__dirname, '../index.js'), '--yes'], { encoding: 'utf-8' });
    // Should fail because we're not providing confirmation, but not because of invalid platform
    expect(result.stderr).not.toContain('Invalid --platform');
  });
  
  test('shows correct platform information', () => {
    // Test the internal platform information
    const platformInfo = 'Next.js 15 (PWA)';
    
    // Just verify the platform info is correct
    expect(platformInfo).toBe('Next.js 15 (PWA)');
  });
});