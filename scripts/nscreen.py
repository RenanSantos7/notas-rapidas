import sys
import os
import subprocess
from pathlib import Path

def create_screen(screen_name):
    screen_dir = f"src/screens/{screen_name}"
    
    Path(screen_dir).mkdir(parents=True, exist_ok=True)
    print(f"Criando screen em: {screen_dir}")
    
    index_content = f"""import {{ Text }} from 'react-native';
import ScreenContainer from '@/components/ScreenContainer'
import useStyles from './styles';

export default function {screen_name}() {{
    return (
        <ScreenContainer>
            <Text>{screen_name}</Text>
        </ScreenContainer>
    );
}};
"""
    
    styles_content = """import { StyleSheet } from 'react-native';

export default function useStyles(theme: ThemeProps) {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
    });
}
"""
    
    index_path = f"{screen_dir}/index.tsx"
    styles_path = f"{screen_dir}/styles.tsx"
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_content)
    
    with open(styles_path, 'w', encoding='utf-8') as f:
        f.write(styles_content)
    
    print(f"Arquivos criados:")
    print(f"  - {index_path}")
    print(f"  - {styles_path}")
    
    try:
        subprocess.run(['code', index_path], check=False)
        print(f"Abrindo {index_path} no VS Code...")
    except FileNotFoundError:
        print("VS Code não encontrado. Arquivos criados com sucesso!")

def main():
    if len(sys.argv) < 2:
        print("Usage: nscreen [screen-name]")
        print("Exemplo: nscreen Home")
        print("  -> Cria em src/screens/Home")
        sys.exit(1)
    
    screen_name = sys.argv[1]
    
    if not screen_name.strip():
        print("Erro: Nome da screen não pode estar vazio.")
        sys.exit(1)
    
    create_screen(screen_name)

if __name__ == "__main__":
    main()