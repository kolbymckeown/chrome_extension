#!/bin/bash

cd backend

case "$OSTYPE" in
  darwin*)  source venv/bin/activate ;;
  linux*)   source venv/bin/activate ;;
  msys*)    source venv/Scripts/activate ;;
esac

flask run