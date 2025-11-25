$map = @{
    # Yellow colors
    'yellow-600' = 'primary-600'
    'yellow-500' = 'primary-500'
    'yellow-400' = 'primary-400'
    'yellow-300' = 'primary-300'
    'yellow-200' = 'primary-200'
    'yellow-100' = 'primary-100'
    'yellow-50'  = 'primary-50'
    # Amber colors
    'amber-600'  = 'primary-600'
    'amber-500'  = 'primary-500'
    'amber-400'  = 'primary-400'
    'amber-300'  = 'primary-300'
    'amber-200'  = 'primary-200'
    'amber-100'  = 'primary-100'
    'amber-50'   = 'primary-50'
}

# Target only source folders and exclude build artefacts
$includePatterns = @('*.tsx', '*.ts', '*.js', '*.jsx')
$excludeDirs = @('node_modules', '\.next', '\.git', 'public', 'dist', 'out', 'temp-restore')

Get-ChildItem -Path . -Recurse -Include $includePatterns -File | Where-Object {
    $full = $_.FullName
    foreach ($ex in $excludeDirs) { if ($full -match [regex]::Escape($ex)) { return $false } }
    return $true
} | ForEach-Object {
    $filePath = $_.FullName
    try {
        $content = Get-Content -Path $filePath -Raw -ErrorAction Stop
    }
    catch {
        $content = (Get-Content -Path $filePath -ErrorAction Stop) -join "`n"
    }
    foreach ($k in $map.Keys) {
        $v = $map[$k]
        $escaped = [regex]::Escape($k)
        $content = $content -replace $escaped, $v
    }
    Set-Content -Path $filePath -Value $content -Force -Encoding UTF8 -ErrorAction Stop
}
