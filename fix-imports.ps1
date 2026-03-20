$root = "src"
Get-ChildItem -Path $root -Filter *.ts* -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $oldContent = $content
    $content = $content.Replace("@/src/components/lib/", "@/lib/")
    $content = $content.Replace("@/src/components/ui/", "@/components/ui/")
    $content = $content.Replace("@/src/components/", "@/components/")
    $content = $content.Replace("@/src/hooks/", "@/hooks/")
    $content = $content.Replace("@/src/lib/", "@/lib/")
    $content = $content.Replace("@/src/app/", "@/app/")
    $content = $content.Replace("@/src/", "@/")
    
    if ($content -ne $oldContent) {
        Write-Host "Updating $($_.FullName)"
        $content | Set-Content $_.FullName
    }
}
