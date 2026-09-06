<#
.SYNOPSIS
  Automated PostgreSQL Database Backup Script for Kanhaiya Pandey Portfolio.
.DESCRIPTION
  Connects to the PostgreSQL container or local service and dumps the database with timestamping.
  Cleans up archives older than the retention period (default 7 days).
#>

param (
    [string]$ContainerName = "portfolio-postgres",
    [string]$Database = "portfolio_db",
    [string]$User = "portfolio",
    [string]$BackupDir = "$PSScriptRoot/../backups",
    [int]$RetentionDays = 7
)

$ErrorActionPreference = "Stop"

# Create backup directory if it does not exist
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
}

$Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$BackupFile = Join-Path $BackupDir "$Database`_$Timestamp.sql"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Database Backup Initiated: $Database" -ForegroundColor Green
Write-Host "  Destination: $BackupFile" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Cyan

try {
    # Check if docker container is running
    $dockerRunning = docker ps --format '{{.Names}}' | Select-String -Pattern "^$ContainerName$"

    if ($dockerRunning) {
        Write-Host "Executing pg_dump via Docker container [$ContainerName]..." -ForegroundColor Gray
        docker exec -t $ContainerName pg_dump -U $User -d $Database --clean --if-exists > $BackupFile
    } else {
        Write-Host "Docker container not running. Attempting local pg_dump..." -ForegroundColor Gray
        pg_dump -U $User -d $Database --clean --if-exists -f $BackupFile
    }

    if (Test-Path $BackupFile) {
        $FileSize = (Get-Item $BackupFile).Length / 1KB
        Write-Host "Backup completed successfully! Size: $([math]::Round($FileSize, 2)) KB" -ForegroundColor Green
    } else {
        throw "Backup file was not created."
    }

    # Retention cleanup
    Write-Host "Pruning backup archives older than $RetentionDays days..." -ForegroundColor Gray
    $CutoffDate = (Get-Date).AddDays(-$RetentionDays)
    Get-ChildItem -Path $BackupDir -Filter "*.sql" | Where-Object { $_.CreationTime -lt $CutoffDate } | ForEach-Object {
        Write-Host "Removing old backup: $($_.Name)" -ForegroundColor Yellow
        Remove-Item $_.FullName -Force
    }

} catch {
    Write-Error "Database backup failed: $_"
    exit 1
}
