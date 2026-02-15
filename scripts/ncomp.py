from pathlib import Path
from subprocess import run
from sys import argv

from nscreen import save_file


def create_component(component_name, relative_path=""):
    """
    Cria um novo componente React Native com os arquivos index.tsx e styles.tsx
    
    Args:
        component_name (str): Nome do componente
        relative_path (str): Caminho relativo a partir de src/ (opcional)
    """
    # Define o diretório do componente
    if not relative_path:
        component_dir = f"src/components/{component_name}"
    else:
        component_dir = f"src/{relative_path}/components/{component_name}"
    
    # Cria o diretório
    Path(component_dir).mkdir(parents=True, exist_ok=True)
    print(f"Criando componente em: {component_dir}")
    
    # Template para index.tsx
    index_content = f"""import {{ View, Text }} from 'react-native';

import useStyles from './styles';

interface {component_name}Props {{

}};

export default function {component_name}(props: {component_name}Props) {{
    return (
        <View>
            <Text>{component_name}</Text>
        </View>
    );
}};
"""
    
    # Template para styles.tsx
    styles_content = """import { StyleSheet } from 'react-native';

import { ThemeProps } from '@/types/theme';

export default function useStyles(theme: ThemeProps) {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
    });
}
"""
    
    # Cria os arquivos
    index_path = f"{component_dir}/index.tsx"
    styles_path = f"{component_dir}/styles.tsx"
    
    save_file(index_path, index_content)
    
    save_file(styles_path, styles_content)
    
    print(f"Arquivos criados:")
    print(f"  - {index_path}")
    print(f"  - {styles_path}")
    
    # Tenta abrir no VS Code
    try:
        run(['code', index_path], check=False, shell=True)
        print(f"Abrindo {index_path} no VS Code...")
    except FileNotFoundError:
        print("VS Code não encontrado. Arquivos criados com sucesso!")

def main():
    """Função principal do script"""
    if len(argv) < 2:
        print("Uso: ncomp [nome-do-componente] [?path-relativo-a-src]")
        print("Exemplo: ncomp.py MeuComponente pages/Edit")
        print("  -> Cria em src/pages/Edit/components/MeuComponente")
        exit(1)
    
    component_name = argv[1]
    relative_path = argv[2] if len(argv) > 2 else ""
    
    if not component_name.strip():
        print("Erro: Nome do componente não pode estar vazio.")
        exit(1)
    
    create_component(component_name, relative_path)

if __name__ == "__main__":
    main()
