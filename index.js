#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

// --- Simple CLI args/env parsing for non-interactive/CI usage ---
const argv = process.argv.slice(2);
const isCI = !!process.env.CI && String(process.env.CI).toLowerCase() !== 'false';
const isNonInteractive = argv.includes('--yes') || isCI || !process.stdout.isTTY;
const forceOverwrite = argv.includes('--force');
const dryRun = argv.includes('--dry-run');
const helpRequested = argv.includes('--help') || argv.includes('-h');

// Show help if requested
if (helpRequested) {
  console.log(`
nxHuman CLI - Minimal AI-Assisted Development Framework

Usage: nxhuman [options]

Options:
  --yes          Non-interactive mode
  --force        Overwrite existing files
  --dry-run      Show planned writes without modifying files
  --help, -h     Show this help message
  `);
  process.exit(0);
}

const questions = [
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Install minimal nxHuman AI framework?',
    default: true
  }
];

// --- Helper function to read framework files ---
const readFrameworkFile = (filePath) => {
  try {
    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Framework file not found at ${fullPath}`);
    }
    return fs.readFileSync(fullPath, 'utf-8');
  } catch (error) {
    console.error(`Critical error: ${error.message}. Installation cannot continue.`);
    process.exit(1);
  }
};

// --- Scan for existing context files ---
const scanExistingContext = (projectPath) => {
  const candidates = [
    path.join(projectPath, '.cursorrules'),
    path.join(projectPath, 'nxhuman.json'),
    path.join(projectPath, 'nxHuman')
  ];
  return candidates.filter((p) => fs.existsSync(p));
};

const writeFileSafe = async (filePath, content, options = {}) => {
  const { force = false } = options;
  if (dryRun) {
    console.log(`DRY-RUN: Would write ${path.basename(filePath)}`);
    return;
  }
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  if (fs.existsSync(filePath) && !force) {
    throw new Error(`File exists: ${filePath}. Use --force to overwrite.`);
  }
  const tempPath = `${filePath}.tmp-${Date.now()}`;
  try {
    fs.writeFileSync(tempPath, content);
    fs.renameSync(tempPath, filePath);
    console.log(`✓ Wrote ${path.basename(filePath)}`);
  } catch (error) {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    throw new Error(`Failed to write ${filePath}: ${error.message}`);
  }
};

// --- Generate minimal .cursorrules content ---
const generateCursorRules = () => {
  return `# AI Instructions

REFER TO nxhuman.json FOR COMPLETE DIRECTIVES

PRIMARY DIRECTIVES:
1. EVIDENCE > ASSUMPTIONS
2. CODE > DOCUMENTATION
3. EFFICIENCY > VERBOSITY
4. USER VALUE > FEATURES

ENGINEERING LOOP:
1. MEASURE: Use codebase_search/grep first
2. PLAN: Create checklist with success criteria
3. EXECUTE: Make minimal, reversible changes
4. VALIDATE: Run quality gates

SPECIALIST ACTIVATION:
- "system" → ARCHITECT
- "UI/component" → FRONTEND
- "API/service" → BACKEND
- "auth/security" → SECURITY
- "performance" → PERFORMANCE
- "product/user" → PRODUCT

QUALITY STANDARDS:
- Components: Types + error boundaries
- APIs: Validation + error responses
- Functions: Single responsibility
- Changes: Tests required

PROGRESSIVE STRATEGY:
1. Skeleton
2. Functionality
3. Resilience
4. Polish
5. Documentation
`;
};

const run = async () => {
  try {
    let answers = {};
    if (isNonInteractive) {
      answers.confirm = true;
    } else {
      answers = await inquirer.prompt(questions);
    }

    if (!answers.confirm) {
      console.log('Installation cancelled.');
      return;
    }

    const projectPath = process.cwd();

    // Pre-scan existing context
    const existing = scanExistingContext(projectPath);
    if (existing.length > 0 && !forceOverwrite && !dryRun) {
      console.error(`Detected existing nxHuman files. Use --force to overwrite.`);
      process.exit(1);
    }

    // Create nxHuman directory
    const nxHumanPath = path.join(projectPath, 'nxHuman');
    if (!dryRun) {
      try {
        fs.mkdirSync(nxHumanPath, { recursive: true });
      } catch (error) {
        throw new Error(`Failed to create directory ${nxHumanPath}: ${error.message}`);
      }
    }

    // Minimal project context
    const context = {
      projectName: path.basename(projectPath),
      techStack: {
        frontend: { language: 'TypeScript' },
        backend: { database: "UNKNOWN" }
      },
      decisionLog: [],
      unknowns: [
        "Define core features",
        "Specify API contracts",
        "Choose components"
      ]
    };

    // Write minimal files
    const nxhumanJsonTemplate = readFrameworkFile('nxHuman/nxhuman-template.json');
    
    // Write files
    await writeFileSafe(path.join(projectPath, 'nxhuman.json'), nxhumanJsonTemplate, { force: forceOverwrite });
    await writeFileSafe(path.join(projectPath, '.cursorrules'), generateCursorRules(), { force: forceOverwrite });
    await writeFileSafe(path.join(nxHumanPath, 'project-context.json'), JSON.stringify(context, null, 2), { force: forceOverwrite });

    if (dryRun) {
      console.log(`\nDRY-RUN COMPLETE: No files written.`);
    } else {
      console.log(`\n✓ Minimal nxHuman framework installed.`);
      console.log(`\nNext steps:`);
      console.log(`1. Open in Cursor to read .cursorrules and nxhuman.json`);
      console.log(`2. Build with AI assistance`);
    }
  } catch (err) {
    console.error(`Error: ${err?.message || err}`);
    process.exit(1);
  }
};

run().catch((err) => {
  console.error(`Error: ${err?.message || err}`);
  process.exit(1);
});