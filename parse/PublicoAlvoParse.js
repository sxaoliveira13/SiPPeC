function PublicoAlvoParse(num){
    if(num == '1'){
        return "Ensino Infantil";
    }
    else if(num == '2'){
        return "Ensino Fundamental I";
    }
    else if(num == '3'){
        return "Ensino Fundamental II";
    }
    else if(num == '4'){
        return "Ensino Médio";
    }
    else if(num == '5'){
        return "Formação para professores";
    }
    else if(num == '6'){
        return "Educação especial";
    }
    else if(num == '7'){
        return "Ensino Técnico";
    }
    else if(num == '8'){
        return "Ensino Superior";
    }
    else if(num == '9'){
        return "Fundamental II / Formação para professores / Ensino Médio / Ensino Técnico / Ensino Superior";
    }
    else if(num == '10'){
        return "Fundamental II / Ensino Médio / Ensino Técnico / Ensino Superior";
    }
    else{
        return num;
    }
}
