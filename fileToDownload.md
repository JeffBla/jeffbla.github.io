---
layout: page
title: It Work!
subtitle: Hey! Don't be naughty!
---

You can download everything.

### Download

1. [視窗作業 5-2](./assets/downloadFile/f74101220_practice_5_2.zip)
2. [ColorYourParenthesis](./assets/downloadFile/colorParenthesis.exe)

### code
<details>
  <summary>AES HomeWork: python</summary>
  
somthing...
    <pre>
        <code>

    from base64 import b64decode, b64encode
    from Crypto.Cipher import AES

    # Encypt test
    # key = b'123456789\0\0\0\0\0\0\0'
    # plainText = bytes('security\0\0\0\0\0\0\0\0', 'utf-8')
    # cipher = AES.new(key, AES.MODE_ECB)
    # encryptText =  cipher.encrypt(plainText)
    # encryptText = b64encode(encryptText).decode('utf-8')
    # print(encryptText)

    # Decypt
    encryptText = b64decode("16zvA3lnMuWHoE5PpaJheQ==")

    charList = list("!\"#$%&\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~")
    len_charList = len(charList)

    with open("record.txt", "w") as file:

        a=b=c=d=0
        for i in range(len_charList):
            for j in range(len_charList):
                for k in range(len_charList):
                    for m in range(len_charList):
                        key_text=f"s{charList[i]}hv{charList[j]}4z*{charList[k]}7d*t{charList[m]}Ce"
                        # print(key_text)
                        key = bytes(key_text, 'utf-8')
                        cipher = AES.new(key, AES.MODE_ECB)
                        plainText = cipher.decrypt(encryptText)
                        try:
                            file.write(plainText.decode('utf-8')+'\n')
                            # print(plainText.decode('utf-8')+"\n")
                            # print(key_text+'\n')
                        except Exception:
                            continue
            print(i)
        </code>
    </pre>

</details>