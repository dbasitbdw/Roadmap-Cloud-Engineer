import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace everything from <style> to </style> with <link rel="stylesheet" href="style.css">
new_content = re.sub(r'<style>.*?</style>', '<link rel="stylesheet" href="style.css">', content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
