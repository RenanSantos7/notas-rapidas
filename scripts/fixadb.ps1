adb reconnect offline
adb disconnect emulator-5554
Get-Process -Name adb -ErrorAction SilentlyContinue | Stop-Process -Force
adb start-server
adb devices