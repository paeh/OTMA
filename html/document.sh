#!/bin/bash
rm -r doc
mkdir doc
cd jsdoc-toolkit

sh jsrun.sh ../script/ -a -r -t=templates/jsdoc/ -d=../doc
cd ..

