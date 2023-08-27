import askCommand from "../commands/ask";
import imagineCommand from "../commands/imagine";

const slashCommandHandler = async (interaction: any) => {
    if (!interaction.isChatInputCommand()) return;
    
    const question = interaction.options.getString('question');
    
    if(interaction.commandName == "ask") {
      await askCommand.execute(interaction, question as string)
    }
  
    if(interaction.commandName === 'imagine') {
      await imagineCommand.execute(interaction, question as string)
    }
}

export default slashCommandHandler