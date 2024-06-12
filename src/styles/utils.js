export const addOpacityToColor = (color, opacity) => {
    const opacityHex = Math.round(opacity * 255).toString(16)
    return `${color}${opacityHex}`
  }

 export const getTypeColor = (typeName) => {
    switch (typeName) {
      case 'normal':
        return { backgroundColor: '#cfc3a3' };
      case 'fire':
        return { backgroundColor: '#f5580a' };
      case 'water':
        return { backgroundColor: '#7a67f5' };
      case 'fighting':
        return { backgroundColor: '#e8be5a' };
      case 'psychic':
        return { backgroundColor: '#b806b2' };
      case 'grass':
        return { backgroundColor: '#0ddb33' };
      case 'poison':
        return { backgroundColor: '#e635cb' };
      case 'electric':
        return { backgroundColor: '#f0f71e' };
      case 'steel':
        return { backgroundColor: '#b2b3ab' };
      case 'ice':
        return { backgroundColor: '#86ddeb' };
      case 'flying':
        return { backgroundColor: '#bbe7ed' };
      case 'ground':
        return { backgroundColor: '#d47c17' };
      case 'fairy':
        return { backgroundColor: '#f50af1' };
      case 'bug':
        return { backgroundColor: '#0af57b' };
      case 'rock':
        return { backgroundColor: '#785702' };
      case 'dragon':
        return { backgroundColor: '#737270' };
      case 'dark':
        return { backgroundColor: '#737270' };
      case 'ghost':
        return { backgroundColor: '#c1a1cc' };
      default:
        return { backgroundColor: 'gray.500', borderColor: 'gray.800' }; // Color predeterminado
    }
  };