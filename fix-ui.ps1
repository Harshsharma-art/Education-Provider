$uiDir = "src\components\ui"
Get-ChildItem -Path $uiDir -Filter *.tsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match "@/components/lib/utils") {
        $newContent = $content -replace "@/components/lib/utils", "@/lib/utils"
        Set-Content $_.FullName $newContent -NoNewline
        Write-Host "Fixed: $($_.Name)"
    }
}
