const fs = require('fs');
const path = require('path');

const TEAM_DIR = path.join(process.cwd(), 'public/images/team');
const TEAM_DATA_DIR = path.join(process.cwd(), 'data/team');

function normalizeImageName(imageName) {
  // Remove a extensão .webp ou .png
  const baseName = imageName.replace(/\.(webp|png)$/i, '');
  
  // Remove números e hífens do início (ex: "1 - " ou "2 - ")
  const cleanName = baseName.replace(/^\d+\s*-\s*/, '');
  
  // Converte underscores para espaços e capitaliza cada palavra
  return cleanName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase());
}

function generateTeamDataForYear(year) {
  const yearPath = path.join(TEAM_DIR, year);
  const dataFilePath = path.join(TEAM_DATA_DIR, `${year}.json`);
  
  if (!fs.existsSync(yearPath)) {
    console.log(`⚠️  Diretório para o ano ${year} não existe`);
    return;
  }

  // Lê dados existentes para preservar LinkedIn URLs
  let existingData = {};
  if (fs.existsSync(dataFilePath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    } catch (error) {
      console.log(`⚠️  Erro ao ler dados existentes para ${year}:`, error.message);
    }
  }

  const categories = fs.readdirSync(yearPath)
    .filter(category => fs.statSync(path.join(yearPath, category)).isDirectory());

  const teamData = {};

  categories.forEach(category => {
    const categoryPath = path.join(yearPath, category);
    
    // Busca apenas imagens que não sejam cartas (aceita .webp e .png)
    const images = fs.readdirSync(categoryPath)
      .filter(file => /\.(webp|png)$/i.test(file) && !/_carta\.(webp|png)$/i.test(file))
      .sort(); // Ordena alfabeticamente

    teamData[category] = images.map(image => {
      const baseName = image.replace(/\.(webp|png)$/i, '');
      const memberName = normalizeImageName(image);
      const imageExtension = image.split('.').pop();
      const cardImage = baseName + '_carta.' + imageExtension;
      
      // Procura dados existentes para preservar LinkedIn
      let existingLinkedIn = '';
      if (existingData[category]) {
        const existingMember = existingData[category].find(member => 
          member.image === image || member.name === memberName
        );
        if (existingMember) {
          existingLinkedIn = existingMember.linkedin || '';
        }
      }
      
      return {
        name: memberName,
        image: image,
        cardImage: cardImage,
        linkedin: existingLinkedIn
      };
    });

    console.log(`✅ Categoria "${category}": ${images.length} membros encontrados`);
  });

  // Salva os dados atualizados
  fs.writeFileSync(dataFilePath, JSON.stringify(teamData, null, 2));
  console.log(`🎉 Dados da equipe para ${year} gerados com sucesso!`);
}

function generateAllTeamData() {
  console.log('🚀 Iniciando geração de dados da equipe...\n');
  
  // Certifica-se de que o diretório data/team existe
  if (!fs.existsSync(TEAM_DATA_DIR)) {
    fs.mkdirSync(TEAM_DATA_DIR, { recursive: true });
    console.log('📁 Diretório data/team criado');
  }

  // Encontra todos os anos disponíveis
  const years = fs.readdirSync(TEAM_DIR)
    .filter(year => {
      const yearPath = path.join(TEAM_DIR, year);
      return fs.statSync(yearPath).isDirectory() && /^\d{4}$/.test(year);
    })
    .sort();

  if (years.length === 0) {
    console.log('❌ Nenhum ano encontrado no diretório team');
    return;
  }

  console.log(`📅 Anos encontrados: ${years.join(', ')}\n`);

  years.forEach(year => {
    console.log(`📊 Processando ano ${year}...`);
    generateTeamDataForYear(year);
    console.log(''); // Linha em branco para separar anos
  });

  console.log('✨ Todos os arquivos de dados da equipe foram gerados!');
  console.log('📝 Lembre-se de adicionar os URLs do LinkedIn manualmente nos arquivos data/team/*.json');
}

// Função para processar apenas um ano específico
function generateDataForSpecificYear(year) {
  console.log(`🚀 Gerando dados para o ano ${year}...\n`);
  
  if (!fs.existsSync(TEAM_DATA_DIR)) {
    fs.mkdirSync(TEAM_DATA_DIR, { recursive: true });
    console.log('📁 Diretório data/team criado');
  }
  
  generateTeamDataForYear(year);
}

// Executa o script
if (process.argv.length > 2) {
  // Se foi fornecido um ano específico como argumento
  const year = process.argv[2];
  if (/^\d{4}$/.test(year)) {
    generateDataForSpecificYear(year);
  } else {
    console.log('❌ Formato de ano inválido. Use: node generateTeamData.js 2024');
  }
} else {
  // Gera dados para todos os anos
  generateAllTeamData();
}
