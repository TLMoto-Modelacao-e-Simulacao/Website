const fs = require('fs');
const path = require('path');
const readline = require('readline');

const TEAM_DATA_DIR = path.join(process.cwd(), 'data/team');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

async function addLinkedInUrls(year) {
  const dataFilePath = path.join(TEAM_DATA_DIR, `${year}.json`);
  
  if (!fs.existsSync(dataFilePath)) {
    console.log(`❌ Arquivo ${year}.json não encontrado`);
    return;
  }

  const teamData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  let hasChanges = false;

  console.log(`🔗 Adicionando URLs do LinkedIn para o ano ${year}\n`);

  for (const [category, members] of Object.entries(teamData)) {
    console.log(`📁 Categoria: ${category}`);
    
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      
      if (!member.linkedin || member.linkedin === '') {
        console.log(`\n👤 Membro: ${member.name}`);
        const linkedinUrl = await askQuestion('   LinkedIn URL (Enter para pular): ');
        
        if (linkedinUrl.trim() !== '') {
          member.linkedin = linkedinUrl.trim();
          hasChanges = true;
          console.log('   ✅ LinkedIn adicionado!');
        } else {
          console.log('   ⏭️  Pulado');
        }
      } else {
        console.log(`   ✅ ${member.name} - LinkedIn já definido`);
      }
    }
  }

  if (hasChanges) {
    fs.writeFileSync(dataFilePath, JSON.stringify(teamData, null, 2));
    console.log(`\n🎉 Dados salvos em ${year}.json`);
  } else {
    console.log(`\n📝 Nenhuma alteração feita`);
  }
}

async function main() {
  console.log('🚀 Ferramenta para adicionar URLs do LinkedIn\n');
  
  // Lista anos disponíveis
  const years = fs.readdirSync(TEAM_DATA_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''))
    .sort();
  
  if (years.length === 0) {
    console.log('❌ Nenhum arquivo de dados da equipe encontrado');
    rl.close();
    return;
  }
  
  console.log(`📅 Anos disponíveis: ${years.join(', ')}`);
  
  const selectedYear = await askQuestion('Qual ano você quer editar? ');
  
  if (!years.includes(selectedYear)) {
    console.log('❌ Ano inválido');
    rl.close();
    return;
  }
  
  await addLinkedInUrls(selectedYear);
  rl.close();
}

main().catch(console.error);
