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
const platformIdx = argv.findIndex(arg => arg.startsWith('--platform='));
const platformArg = platformIdx !== -1 ? argv[platformIdx].split('=')[1].toLowerCase() : '';

// Strict platform mapping
const platformMap = new Map([
  ['next', 'Next.js (PWA)'],
  ['ios', 'iOS (Swift)'],
  ['flutter', 'Flutter (iOS & Android)']
]);
const resolvePlatform = () => {
  const resolved = platformMap.get(platformArg);
  if (!resolved) throw new Error(`Invalid --platform: ${platformArg || 'missing'}. Use next, ios, or flutter.`);
  return resolved;
};

// Paths used for logging and outputs
const projectPath = process.cwd();
const nxHumanPath = path.join(projectPath, 'nxHuman');
const logsDir = path.join(nxHumanPath, 'logs');
const logsFile = path.join(logsDir, 'actions.csv');

// --- Telemetry: CSV logging ---

const questions = [
  {
    type: 'confirm',
    name: 'confirm',
    message: 'This will install the nxHuman engineering framework in the current directory. Continue?',
    default: true
  },
  {
    type: 'list',
    name: 'platform',
    message: 'Which platform are you targeting?',
    choices: ['Next.js (PWA)', 'iOS (Swift)', 'Flutter (iOS & Android)'],
    when: (answers) => answers.confirm
  }
];

// --- Helper function to read framework files ---
const readFrameworkFile = (filePath) => {
  try {
    return fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
  } catch (error) {
    console.error(`Critical error: Framework file not found at ${filePath}. Installation cannot continue.`);
    process.exit(1);
  }
};

// --- Scan for existing context files to avoid blind overwrites ---
const scanExistingContext = (projectPath) => {
  const candidates = [
    path.join(projectPath, '.cursorrules'),
    path.join(projectPath, 'project-context.json'),
    path.join(projectPath, 'nxHuman', 'project-context.json'),
    path.join(projectPath, 'nxHuman', 'PERSONAS.md'),
    path.join(projectPath, 'nxHuman', 'WORKFLOWS.md'),
    path.join(projectPath, 'nxHuman', 'design.md'),
    path.join(projectPath, 'nxHuman', 'libDocs.md'),
    path.join(projectPath, 'nxHuman', 'system.md')
  ];
  return candidates.filter((p) => fs.existsSync(p));
};

const writeFileSafe = async (filePath, content, options = {}) => {
  const { force = false, writtenFiles = [] } = options;
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
  fs.writeFileSync(tempPath, content);
  fs.renameSync(tempPath, filePath);
  writtenFiles.push(filePath);
  console.log(`? Wrote ${path.basename(filePath)}`);
};

const run = async () => {
  // Build answers either via prompt or non-interactive fast-path
  let answers = {};
  if (isNonInteractive) {
    answers.confirm = true;
    answers.platform = resolvePlatform();
  } else {
    answers = await inquirer.prompt(questions);
  }

  if (!answers.confirm) {
    console.log('Installation cancelled.');
    return;
  }

  const { platform } = answers;
  const projectPath = process.cwd();
  const nxHumanPath = path.join(projectPath, 'nxHuman');

  // Pre-scan existing context
  const existing = scanExistingContext(projectPath);
  if (existing.length > 0 && !forceOverwrite && !dryRun) {
    console.error(`Detected existing nxHuman files. Re-run with --force to overwrite all, or use --dry-run to preview.`);
    process.exit(1);
  }

  // Create project and nxHuman directories (skip in dry-run)
  if (!dryRun) {
    fs.mkdirSync(nxHumanPath, { recursive: true });
  }

  const context = {
    projectName: path.basename(projectPath),
    platform: platform,
    architecture: {
      style: "UNKNOWN: Please specify (e.g., Monolithic, Microservices, Serverless)",
      keyDecisions: []
    },
    techStack: {
      frontend: {
        framework: platform === 'Next.js (PWA)' ? 'Next.js' : (platform === 'Flutter (iOS & Android)' ? 'Flutter' : 'UNKNOWN'),
        language: platform === 'Next.js (PWA)' ? 'TypeScript/JavaScript' : (platform === 'iOS (Swift)' ? 'Swift' : (platform === 'Flutter (iOS & Android)' ? 'Dart' : 'UNKNOWN')),
        uiLibrary: "UNKNOWN: Please specify (e.g., Material UI, TailwindCSS, custom)"
      },
      backend: {
        framework: "UNKNOWN: Please specify (e.g., Node.js/Express, Python/Django, Go)",
        database: "UNKNOWN: Please specify (e.g., PostgreSQL, MongoDB, DynamoDB)"
      }
    },
    design: {
      system: "See `/nxHuman/design.md` for brand identity, colors, and typography.",
      assets: "User-provided asset paths are located in `/nxHuman/design.md`."
    },
    decisionLog: [
      {
        date: new Date().toISOString(),
        decision: `Initial project setup for ${platform}.`,
        rationale: "User selection during nxHuman CLI setup.",
        status: "COMMITTED"
      }
    ],
    unknowns: [
      "Define primary user stories and core features.",
      "Specify API contracts and data models.",
      "Detail the deployment strategy and CI/CD pipeline."
    ]
  };

  // Handle root project-context.json merge
  const rootContextPath = path.join(projectPath, 'project-context.json');
  if (fs.existsSync(rootContextPath) && !dryRun) {
    const rootContent = JSON.parse(fs.readFileSync(rootContextPath, 'utf-8'));
    Object.assign(context, rootContent); // simple merge, new wins
    fs.unlinkSync(rootContextPath); // move to nxHuman
    console.log('? Merged and moved root project-context.json to nxHuman/');
  }

  // Write the project context file
  const contextFilePath = path.join(nxHumanPath, 'project-context.json');
  const writtenFiles = [];
  await writeFileSafe(contextFilePath, JSON.stringify(context, null, 2), { force: forceOverwrite, writtenFiles });

  // --- Copy framework files into nxHuman folder ---
  const personasContent = readFrameworkFile('nxHuman/PERSONAS.md');
  const workflowsContent = readFrameworkFile('nxHuman/WORKFLOWS.md');
  const systemContent = readFrameworkFile('nxHuman/system.md');
  const designContent = readFrameworkFile('nxHuman/design.md');
  const libDocsContent = readFrameworkFile('nxHuman/libDocs.md');
  const cursorRulesTemplate = readFrameworkFile('nxHuman/cursorrules-template.md');

  await writeFileSafe(path.join(nxHumanPath, 'PERSONAS.md'), personasContent, { force: forceOverwrite, writtenFiles });
  await writeFileSafe(path.join(nxHumanPath, 'WORKFLOWS.md'), workflowsContent, { force: forceOverwrite, writtenFiles });
  await writeFileSafe(path.join(nxHumanPath, 'system.md'), systemContent, { force: forceOverwrite, writtenFiles });
  await writeFileSafe(path.join(nxHumanPath, 'design.md'), designContent, { force: forceOverwrite, writtenFiles });
  await writeFileSafe(path.join(nxHumanPath, 'libDocs.md'), libDocsContent, { force: forceOverwrite, writtenFiles });


  // --- Create a comprehensive .cursorrules file ---
  const cursorRulesPath = path.join(projectPath, '.cursorrules');
  await writeFileSafe(cursorRulesPath, cursorRulesTemplate, { force: forceOverwrite, writtenFiles });

  // Note: Partial update warning removed. In non-dry-run mode, we either overwrite all (with --force)
  // or exit early when existing files are detected. Dry-run mode only reports planned writes.

  if (dryRun) {
    console.log(`\nDRY-RUN COMPLETE: No files written. Use --force with --yes to run non-interactively.`);
  } else {
    console.log(`\n? nxHuman framework installed. You can start building with your AI assistant.`);
  }
};

run().catch((err) => {
  console.error(`Unexpected error: ${err?.message || err}`);
  process.exit(1);
});
