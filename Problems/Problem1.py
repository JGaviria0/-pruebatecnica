def capitalizar(s):
    # return s.capitalize()
    aux = s
    if ord(s[0]) >= 97 and ord(s[0]) <= 122:
        aux = chr( ord(s[0]) - 32 ) + s[1:]
    return aux

if __name__ == "__main__":
    s = str(input("Enter the string you want to put capital letter: "))
    ans = capitalizar(s)
    print(ans)