import askCommand from "./../commands/ask.js"
import imagineCommand from "./../commands/imagine.js";

const slashCommandHandler = async (interaction: any) => {

    try{
        if (!interaction.isChatInputCommand()) return;
    
        // get command input using its name
        const question = interaction.options.getString('question');
        
        if(interaction.commandName == "ask") {
          await askCommand.execute(interaction, question as string)
        }
      
        if(interaction.commandName === 'imagine') {
          await imagineCommand.execute(interaction, question as string)
        }

    }catch(err) {
          interaction.reply("Server Error: " + (err as Error).message)
    }
}

export default slashCommandHandler