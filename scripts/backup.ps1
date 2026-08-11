# Automated Backup Script for henotic-diagnostics
# Target Backup Directory: C:\henotic-diagnostics-backups

Param (
    [string]$BackupRootDir = "C:\henotic-diagnostics-backups",
    [string]$ProjectDir = "c:\henotic-diagnostics"
)

$ErrorActionPreference = "Stop"
$dateStr = Get-Date -Format "yyyy-MM-dd"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " Starting Automated Project Backup" -ForegroundColor Cyan
Write-Host " Date: $dateStr | Time: $timestamp" -ForegroundColor Cyan
Write-Host " Source: $ProjectDir" -ForegroundColor Cyan
Write-Host " Target: $BackupRootDir" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Ensure target directory exists
if (-not (Test-Path $BackupRootDir)) {
    New-Item -ItemType Directory -Force -Path $BackupRootDir | Out-Null
    Write-Host "[+] Created backup directory: $BackupRootDir" -ForegroundColor Green
}

# 2. Git Full Repository Bundle Snapshot
$bundleFile = Join-Path $BackupRootDir "henotic-diagnostics-full-$dateStr.bundle"
Write-Host "[1/3] Creating Git Repository Bundle Snapshot..." -ForegroundColor Yellow
try {
    git bundle create $bundleFile --all
    Write-Host "[+] Git Bundle created successfully: $bundleFile" -ForegroundColor Green
} catch {
    Write-Host "[!] Warning: Git bundle creation failed: $_" -ForegroundColor Red
}

# 3. Directory Copy Snapshot (Excluding heavy build artifacts)
$backupFolder = Join-Path $BackupRootDir "henotic-diagnostics_backup_$timestamp"
Write-Host "[2/3] Copying Project Files to Snapshot Directory..." -ForegroundColor Yellow

$excludeDirs = @("node_modules", ".next", ".git", "playwright-report", "test-results")
robocopy $ProjectDir $backupFolder /E /XD $excludeDirs /R:1 /W:1 | Out-Null

# Robocopy exit code <= 7 indicates success
if ($LASTEXITCODE -le 7) {
    Write-Host "[+] Directory snapshot created successfully: $backupFolder" -ForegroundColor Green
} else {
    Write-Host "[!] Robocopy completed with code: $LASTEXITCODE" -ForegroundColor Yellow
}

# 4. Create Compressed ZIP Archive
$zipFile = Join-Path $BackupRootDir "henotic-diagnostics-backup-$dateStr.zip"
Write-Host "[3/3] Creating Compressed ZIP Archive..." -ForegroundColor Yellow
try {
    Compress-Archive -Path "$backupFolder\*" -DestinationPath $zipFile -Force
    Write-Host "[+] ZIP Archive created successfully: $zipFile" -ForegroundColor Green
} catch {
    Write-Host "[!] Warning: ZIP compression failed: $_" -ForegroundColor Red
}

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " Backup Completed Successfully!" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
