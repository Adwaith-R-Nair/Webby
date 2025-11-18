import {GoogleGenAI} from "@google/genai";
import readlineSync from 'readline-sync';
import {exec} from 'child_process';
import {promisify} from 'util';
import dotenv from 'dotenv';
import os from 'os';

const platform = os.platform();

dotenv.config();

const asyncExecute = promisify(exec);

const History = []
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})


// Tool to execute terminal / shell commands
async function executeCommand({command}) {
    try{
        const {stdout, stderr} = await asyncExecute(command);

        if (stderr){
            return `Error: ${stderr}`;
        }

        return `Success: ${stdout} || Task executed successfully.`;
    }
    catch(error){
        return `Error : ${error}`;
    }
}


const executeCommandDeclaration = {
    name: "executeCommand",
    description: "Execute any terminal or shell command on the system. The command can be to create a folder, file, write on a file, edit the file or delete the file or folder.",
    parameters: {
        type: 'OBJECT',
        properties: {
            command: {
                type: 'STRING',
                description: 'The terminal or shell command to be executed. Eg: mkdir calculator',
            }
        },
        required: ['command']
    }
}


const availableTools = {
    executeCommand: executeCommand,
}


async function runAgent(userProblem){

    History.push({
        role: "user",
        parts: [{text:userProblem}]
    })

    while(true){
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: History,
        config: {
            systemInstruction: `# System Instructions for Webby (Ultra-Compact)

You are 'Webby', an expert web developer.  
Your job is to help the user create a frontend website by giving step-by-step terminal commands.

You may use the 'executeCommand' tool to run commands.  
User OS: ${platform}

## Rules
1. Understand what website the user wants.
2. Give simple, sequential commands (mkdir, file creation, writing code).
3. Only one step at a time.
4. After creating files, provide the exact file content when needed.
5. Continue until the website is complete.
6. When done, notify the user.

## Typical Flow
1. Create project folder.
2. Create necessary files (index.html, styles.css, script.js).
3. Fill each file with appropriate code.
4. Guide the user until the website is fully ready.
`,
            tools:[{
                functionDeclarations: [executeCommandDeclaration],
            }],
        },
    });


    if(response.functionCalls && response.functionCalls.length > 0){

        console.log("Function call from model: ", response.functionCalls[0]);
        const {name, args} = response.functionCalls[0];

        const funCall = availableTools[name];
        const result = await funCall(args);

        const functionResponsePart = {
            name: name,
            response: {
                result: result,
            }
        }

        // model
        History.push({
            role: "model",
            parts: [{
                functionCall: response.functionCalls[0],
            }]
        })

        // push result to history
        History.push({
            role: "model",
            parts: [{
                functionResponse: functionResponsePart,
            }]
        })

    }

    else{

        History.push({
            role: "model",
            parts: [{text: response.text}]
        })
        console.log("Webby: ", response.text);
        break;
    }
    }

}


async function main(){
    console.log("Hey, I am Webby, your website building assistant. Let's create a really cool website : ");
    const userProblem = readlineSync.question('Website description --> ');
    await runAgent(userProblem);
    main();
}

main();