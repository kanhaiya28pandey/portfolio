#!/usr/bin/env bash
# ==============================================================================
# Automated PostgreSQL Database Backup Script for Kanhaiya Pandey Portfolio
# ==============================================================================

set -euo pipefail

CONTAINER_NAME="${CONTAINER_NAME:-portfolio-postgres}"
DATABASE="${DATABASE:-portfolio_db}"
USER="${USER:-portfolio}"
RETENTION_DAYS="${RETENTION_DAYS:-7}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="${SCRIPT_DIR}/../backups"

mkdir -p "${BACKUP_DIR}"

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="${BACKUP_DIR}/${DATABASE}_${TIMESTAMP}.sql.gz"

echo "=================================================="
echo " Starting Database Backup: ${DATABASE}"
echo " Destination: ${BACKUP_FILE}"
echo "=================================================="

if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "Running pg_dump inside Docker container [${CONTAINER_NAME}]..."
    docker exec -t "${CONTAINER_NAME}" pg_dump -U "${USER}" -d "${DATABASE}" --clean --if-exists | gzip > "${BACKUP_FILE}"
else
    echo "Container not found. Executing local pg_dump..."
    pg_dump -U "${USER}" -d "${DATABASE}" --clean --if-exists | gzip > "${BACKUP_FILE}"
fi

if [ -f "${BACKUP_FILE}" ]; then
    FILE_SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
    echo "Backup completed successfully! Archive size: ${FILE_SIZE}"
else
    echo "ERROR: Backup archive could not be created." >&2
    exit 1
fi

echo "Pruning backups older than ${RETENTION_DAYS} days..."
find "${BACKUP_DIR}" -type f -name "${DATABASE}_*.sql.gz" -mtime "+${RETENTION_DAYS}" -exec rm -f {} \;
echo "Pruning complete."
