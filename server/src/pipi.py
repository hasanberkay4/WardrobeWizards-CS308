import os

# specify the directory you want to scan
directory = "./images"

# use the listdir() function from the os module to get filenames
filenames = os.listdir(directory)

print(filenames)
