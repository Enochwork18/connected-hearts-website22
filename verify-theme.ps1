# Theme System Verification Script

Write-Host "=== Theme System Implementation Verification ===" -ForegroundColor Cyan
Write-Host ""

$baseDir = "C:\Users\Bismark Enoch\Desktop\connected-hearts-website22-main"

# Check if files exist
Write-Host "Checking new files..." -ForegroundColor Yellow
$newFiles = @(
    "lib\theme-script.ts",
    "lib\use-theme-enhanced.ts",
    "styles\theme.css",
    "components\theme-toggle-advanced.tsx",
    "README-THEME.md",
    "THEME-INTEGRATION-GUIDE.md",
    "THEME-QA-CHECKLIST.md",
    "THEME-ROLLBACK.md",
    "THEME-SUMMARY.md"
)

$allExist = $true
foreach ($file in $newFiles) {
    $path = Join-Path $baseDir $file
    if (Test-Path $path) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file MISSING" -ForegroundColor Red
        $allExist = $false
    }
}

Write-Host ""
Write-Host "Checking modified files..." -ForegroundColor Yellow
$modifiedFiles = @(
    "lib\contexts\theme-context.tsx",
    "app\layout.tsx",
    "app\globals.css",
    "components\admin-header.tsx"
)

foreach ($file in $modifiedFiles) {
    $path = Join-Path $baseDir $file
    if (Test-Path $path) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file MISSING" -ForegroundColor Red
        $allExist = $false
    }
}

Write-Host ""
if ($allExist) {
    Write-Host "✓ All files present!" -ForegroundColor Green
} else {
    Write-Host "✗ Some files are missing!" -ForegroundColor Red
}

Write-Host ""
Write-Host "Checking file contents..." -ForegroundColor Yellow

# Check if layout.tsx has the theme script
$layoutContent = Get-Content (Join-Path $baseDir "app\layout.tsx") -Raw
if ($layoutContent -match "themeScriptMinified") {
    Write-Host "  ✓ layout.tsx has theme script import" -ForegroundColor Green
} else {
    Write-Host "  ✗ layout.tsx missing theme script import" -ForegroundColor Red
}

if ($layoutContent -match "dangerouslySetInnerHTML") {
    Write-Host "  ✓ layout.tsx has inline script" -ForegroundColor Green
} else {
    Write-Host "  ✗ layout.tsx missing inline script" -ForegroundColor Red
}

# Check if globals.css imports theme.css
$globalsContent = Get-Content (Join-Path $baseDir "app\globals.css") -Raw
if ($globalsContent -match "theme\.css") {
    Write-Host "  ✓ globals.css imports theme.css" -ForegroundColor Green
} else {
    Write-Host "  ✗ globals.css missing theme.css import" -ForegroundColor Red
}

# Check if admin-header has theme toggle
$adminHeaderContent = Get-Content (Join-Path $baseDir "components\admin-header.tsx") -Raw
if ($adminHeaderContent -match "ThemeToggleAdvanced") {
    Write-Host "  ✓ admin-header.tsx has theme toggle" -ForegroundColor Green
} else {
    Write-Host "  ✗ admin-header.tsx missing theme toggle" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Verification Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Run: npm run dev" -ForegroundColor White
Write-Host "  2. Open: http://localhost:3000" -ForegroundColor White
Write-Host "  3. Test theme toggle in header" -ForegroundColor White
Write-Host "  4. Follow THEME-QA-CHECKLIST.md" -ForegroundColor White
Write-Host ""
