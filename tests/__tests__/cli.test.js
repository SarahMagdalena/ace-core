'use strict';

const ace = require('../runAceCLI');
const pkg = require('../../packages/ace-core/package');

const path = require('path');

describe('Running the CLI', () => {
  test('with no input should fail', () => {
    const { stdout, stderr, status } = ace([]);
    expect(status).toBe(1);
    expect(stderr.trim()).toMatchSnapshot();
    expect(stdout).toMatchSnapshot();
  });
  
  test('with the -h option should print help', () => {
    const { stdout, stderr, status } = ace(['-h']);
    expect(status).toBe(0);
    expect(stderr).toBe('');
    expect(stdout).toMatchSnapshot();
  });
  
  test('with the -v option should print the version number', () => {
    const { stdout, stderr, status } = ace(['-v']);
    expect(status).toBe(0);
    expect(stderr).toBe('');
    expect(stdout.trim()).toBe(pkg.version);
  });
  
  test('with the --version option should print the version number', () => {
    const { stdout, stderr, status } = ace(['--version']);
    expect(status).toBe(0);
    expect(stderr).toBe('');
    expect(stdout.trim()).toBe(pkg.version);
  });
  
  test('on an unexisting document should fail', () => {
    const { stdout, stderr, status } = ace(['unexisting.epub']);
    expect(status).toBe(1);
    expect(stdout.trim()).toMatchSnapshot();
    expect(stderr).toMatchSnapshot();
  });
  
  test('with -o pointing to an existing directory should fail', () => {
    const { stdout, stderr, status } = ace(['-o', 'report', 'foo'], {
      cwd: path.resolve(__dirname, '../data'),
    });
    expect(status).toBe(1);
    expect(stderr).toBe('');
    expect(stdout).toMatchSnapshot();
  });

  test('with --silent and no --outdir should print the JSON report to standard output', () => {
    const { stdout, stderr, status } = ace(['-s', 'base-epub-30'], {
      cwd: path.resolve(__dirname, '../data'),
    });
    expect(status).toBe(0);
    expect(stderr).toBe('');
    expect(() => JSON.parse(stdout)).not.toThrow(SyntaxError);
    const res = JSON.parse(stdout);
    expect(res).toMatchObject({ '@type': 'earl:report' });
  });
});

