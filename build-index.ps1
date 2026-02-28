$premium = Get-Content "premium-dashboard\dashboard.html"
$orig = git show HEAD:index.html 2>$null | Out-String -Stream
$modalStart = ($orig | Select-String "<!-- Modal for Add Table" -List).LineNumber - 1
$modalLines = $orig[$modalStart..($orig.Length-1)]
$modalLines = $modalLines | Where-Object {$_ -notmatch "</body>" -and $_ -notmatch "</html>"}
$toastIdx = ($premium | Select-String "<!-- toast container -->").LineNumber - 1
if($toastIdx -lt 0){$toastIdx=$premium.Length}
$before = $premium[0..($toastIdx-1)]
$after = $premium[$toastIdx..($premium.Length-1)]
$new = @(); $new += $before; $new += $modalLines; $new += $after
for($i=0;$i -lt $new.Length;$i++){
  if($new[$i] -match '<link rel="stylesheet"'){
    $new = $new[0..$i] + @("    <script>if(sessionStorage.getItem('adminLoggedIn')!=='true'){window.location.href='admin-login.html';}</script>") + $new[($i+1)..($new.Length-1)]; break
  }
}
$new = $new -replace '<title>Premium Admin Dashboard</title>','<title>Restaurant Management System</title>'
$new | Set-Content "index.html" -Encoding utf8
