import * as assert from 'assert';
import * as vscode from 'vscode';
import * as unwsl from "../../extension";

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Transform', () => {
		assert.equal(unwsl.transformWSLPath("/mnt/c/foo"), "C:\\foo");
		assert.equal(unwsl.transformWSLPath("/mnt/d/bar"), "D:\\bar");
		assert.equal(unwsl.transformWSLPath("/mnt/e"), "E:");
	});

	test('Ignore', () => {
		assert.equal(unwsl.transformWSLPath("/foo/bar/"), "/foo/bar/");
		assert.equal(unwsl.transformWSLPath("/mntc/bar/"), "/mntc/bar/");
	});
});
