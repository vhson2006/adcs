#!/bin/bash
set -e
psql -U postgres -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
