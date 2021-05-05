
def reducir(s):
    s = s.lower()
    aux = s[0]
    for i in range(1,len(s)):
        if s[i] != s[i-1]:
            aux = aux + s[i] 
    
    return aux

def validar(s):
    s = reducir(s)
    if s == "hola":
        return "VERDADERO"
    else:
        return "FALSO"

if __name__ == "__main__":
    s = str(input("Enter the string: "))
    ans = validar(s)
    print( '"' + ans + '"')