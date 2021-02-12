# Setting up the devlopment environment
We recomend using VScode for development

Requires the installation of the Windows Subsystem for Linux (wsl)
See: https://docs.microsoft.com/en-us/windows/wsl/install-win10

Once installed type the command 'wsl' into the terminal in VScode 
(or if not using vscode press win+r and type 'wsl' into the run box)

Next, type 'cd dev' then run the script 'setup.sh' from your wsl terminal by typing 'sudo ./setup.sh'
Note: You may need to run the command 'sudo chmod 755 setup.sh' if you get any errors about not having permissions 

This script should handle installing the updates and packages required for running our project


