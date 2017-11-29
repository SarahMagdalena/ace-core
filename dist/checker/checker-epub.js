'use strict';

const builders = require('../report/report-builders.js');
const Rules = require('./rules');

const winston = require('winston');

const ASSERTED_BY = 'Ace';
const MODE = 'automatic';
const KB_BASE = 'http://kb.daisy.org/publishing/';

function asString(arrayOrString) {
  if (Array.isArray(arrayOrString) && arrayOrString.length > 0) {
    return asString(arrayOrString[0]);
  } else if (arrayOrString !== undefined) {
    return arrayOrString.toString().trim();
  }
  return '';
}

function newViolation({ impact = 'serious', title, testDesc, resDesc, kbPath, kbTitle }) {
  return new builders.AssertionBuilder().withAssertedBy(ASSERTED_BY).withMode(MODE).withTest(new builders.TestBuilder().withImpact(impact).withTitle(title).withDescription(testDesc).withHelp(KB_BASE + kbPath, kbTitle).withRulesetTags(['EPUB']).build()).withResult(new builders.ResultBuilder('fail').withDescription(resDesc).build()).build();
}

function check(epub, report) {
  winston.info('Checking package...');

  // normalize title property for future processing
  // TODO: Can asString() replaced by (epub.metadata['dc:title'] || '').toString().trim()
  // TODO: or it is possible that metadata['dc:title'] include more than one element?
  epub.metadata['dc:title'] = asString(epub.metadata['dc:title']);

  const assertion = new builders.AssertionBuilder().withSubAssertions().withTestSubject(epub.packageDoc.src, epub.metadata['dc:title']);

  // check all rules
  new Rules().all.forEach(rule => {
    const runCheck = require(rule.check);
    if (runCheck(epub)) {
      assertion.withAssertions(newViolation(rule));
    }
  });

  report.addAssertions(assertion.build());
  // Report the Nav Doc
  report.addEPUBNav(epub.navDoc);
  // Report package properties
  report.addProperties({
    hasManifestFallbacks: epub.hasManifestFallbacks,
    hasBindings: epub.hasBindings
  });

  return Promise.resolve();
}

module.exports.check = check;