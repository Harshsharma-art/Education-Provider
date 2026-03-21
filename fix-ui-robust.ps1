$uiDir = "src\components\ui"
$files = Get-ChildItem -Path $uiDir -Filter *.tsx
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    if ($content.Contains("@/components/lib/utils")) {
        $newContent = $content.Replace("@/components/lib/utils", "@/lib/utils")
        [System.IO.File]::WriteAllText($file.FullName, $newContent)
        Write-Host "Updated: $($file.Name)"
    }
}
