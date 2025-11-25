$map = @{
    # Background colors
    'bg-gray-950'='bg-primary-900'
    'bg-gray-900'='bg-primary-900'
    'bg-gray-800'='bg-primary-800'
    'bg-gray-700'='bg-primary-700'
    'bg-gray-600'='bg-primary-600'
    'bg-gray-500'='bg-primary-500'
    'bg-gray-400'='bg-primary-400'
    'bg-gray-300'='bg-primary-300'
    'bg-gray-200'='bg-primary-200'
    'bg-gray-100'='bg-primary-100'
    'bg-gray-50'='bg-primary-50'
    'bg-white'='bg-primary-50'
    'bg-blue-600'='bg-primary-600'
    'bg-blue-500'='bg-primary-500'
    # Text colors
    'text-gray-900'='text-primary-900'
    'text-gray-800'='text-primary-800'
    'text-gray-700'='text-primary-700'
    'text-gray-600'='text-primary-600'
    'text-gray-500'='text-primary-500'
    'text-gray-400'='text-primary-400'
    'text-gray-300'='text-primary-300'
    'text-gray-200'='text-primary-200'
    'text-gray-100'='text-primary-100'
    'text-white'='text-primary-50'
    # Border colors
    'border-gray-900'='border-primary-900'
    'border-gray-800'='border-primary-800'
    'border-gray-700'='border-primary-700'
    'border-gray-600'='border-primary-600'
    'border-gray-500'='border-primary-500'
    'border-gray-400'='border-primary-400'
    'border-gray-300'='border-primary-300'
    'border-gray-200'='border-primary-200'
    'border-gray-100'='border-primary-100'
    # Hover variants (will be covered by same keys)
    'hover:bg-gray-900'='hover:bg-primary-900'
    'hover:bg-gray-800'='hover:bg-primary-800'
    'hover:bg-gray-700'='hover:bg-primary-700'
    'hover:bg-gray-600'='hover:bg-primary-600'
    'hover:bg-gray-500'='hover:bg-primary-500'
    'hover:bg-gray-400'='hover:bg-primary-400'
    'hover:bg-gray-300'='hover:bg-primary-300'
    'hover:bg-gray-200'='hover:bg-primary-200'
    'hover:bg-gray-100'='hover:bg-primary-100'
    'hover:bg-blue-600'='hover:bg-primary-600'
    'hover:text-gray-900'='hover:text-primary-900'
    'hover:text-gray-800'='hover:text-primary-800'
    'hover:text-gray-700'='hover:text-primary-700'
    'hover:text-gray-600'='hover:text-primary-600'
    'hover:text-gray-500'='hover:text-primary-500'
    'hover:text-gray-400'='hover:text-primary-400'
}

# Target only source folders (components, sections, layout, app, pages) and exclude build artefacts
$includePatterns = @('*.tsx','*.ts','*.js','*.jsx')
$excludeDirs = @('node_modules','\.next','\.git','public','dist','out')

Get-ChildItem -Path . -Recurse -Include $includePatterns -File | Where-Object {
    $full = $_.FullName
    foreach ($ex in $excludeDirs) { if ($full -match [regex]::Escape($ex)) { return $false } }
    return $true
} | ForEach-Object {
    $filePath = $_.FullName
    try {
        $content = Get-Content -Path $filePath -Raw -ErrorAction Stop
    } catch {
        $content = (Get-Content -Path $filePath -ErrorAction Stop) -join "`n"
    }
    foreach ($k in $map.Keys) {
        $v = $map[$k]
        $escaped = [regex]::Escape($k)
        $content = $content -replace $escaped, $v
    }
    Set-Content -Path $filePath -Value $content -Force -Encoding UTF8 -ErrorAction Stop
}
