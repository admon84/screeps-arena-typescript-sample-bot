import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import fg from 'fast-glob';
import path from 'path';
import clear from 'rollup-plugin-clear';
import typescript from 'rollup-plugin-typescript2';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRootDir = path.resolve(__dirname);
const scriptLimit = 10_000_000; // 10mb
const megaByte = 1_000_000;

let targetArena = '';
if (process.argv[3] === '--config-') {
  targetArena = process.argv[4] || ''; // dynamic mode
} else if (process.argv[3] === '--environment') {
  targetArena = process.env.DEST;
}

const arenas = fg.sync(`src/arena_*${targetArena}*`, {
  onlyDirectories: true,
});
if (arenas.length === 0) {
  throw new Error(`No arenas found in src matching ${targetArena}'`);
} else {
  const tag = arenas.length > 1 ? 's' : '';
  if (targetArena === '') {
    console.log(`Building all ${arenas.length} arena${tag}.`);
  } else {
    console.log(`Building ${arenas.length} arena${tag} for target "${targetArena}"`);
  }
}

const getOptions = arena => {
  return {
    input: `${arena}/main.ts`,
    external: [
      'arena',
      'arena/prototypes',
      'game',
      'game/constants',
      'game/path-finder',
      'game/prototypes',
      'game/utils',
      'game/visual',
    ],
    output: {
      dir: arena.replace('src/', 'dist/'),
      format: 'esm',
      sourcemap: false,
      entryFileNames: '[name].mjs',
      paths: srcPath => {
        if (srcPath.startsWith('game') || srcPath.startsWith('arena')) {
          return `/${srcPath}`;
        }
      },
    },
    plugins: [
      clear({ targets: arenas.map(v => v.replace('src/', 'dist/')) }),
      alias({
        entries: [
          {
            find: 'common',
            replacement: path.resolve(projectRootDir, 'src/common'),
          },
        ],
      }),
      resolve({ rootDir: 'src' }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      {
        generateBundle(_options, bundle) {
          for (const [fileName, { code }] of Object.entries(bundle)) {
            if (fileName === 'main.mjs' && code && code.length >= scriptLimit * 0.98) {
              console.log(`Warning: Script limit is ${scriptLimit / megaByte}mb, output is ${code.length} bytes`);
            }
          }
        },
      },
    ],
  };
};

export default arenas.map(getOptions);
