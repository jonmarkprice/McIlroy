// TODO render saved-program as a react component.
// In fact, can probably use same componet from main app

// UPDATE:
// There's a SavedProgram *container*, but not component.
// i.e. it uses Redux state...
// TODO: Use ProgramRow instead, then use a <div> for name

const React = require('react');
const ReactDOM = require('react-dom');
const { renderToString } = require('react-dom/server');

// TODO: This will need to change when I "rebase"
const ProgramRow = require('./components/ProgramRow');

const Program = ({name, program}) => {
console.log("---- In Program ---");
console.log(name)
console.log(program)
return (
  <div className="saved-program">
    <h3 className="program-name">{name}</h3>
    <ProgramRow program={program} />
  </div>
);
}

const User = ({name, programs}) => {
console.log("Data in <User>...");
console.log(name);
console.log(programs);

return (
  <div>
    <h1>Dashboard</h1>
    <h2>{name}</h2>
    <p>Hello</p>
    <h2>Programs</h2>
    <div>
    {
      programs.map((p, index) => {
        console.log("Mapping programs...");
        console.log(index);
        console.log(p);
        console.log(p.name);
        console.log(p.expansion);
        console.log("-------------------------");
        return (<Program key={index} name={p.name} program={p.expansion} />);
      })
    }
    </div>
  </div>
);
}

const renderUser = ({name, programs}) => {
  console.log("Rendering...");
  console.log(name);
  console.log(programs);
  const html = renderToString(<User name={name} programs={programs} />);
  console.log(html);
  return html;
}

module.exports = { renderUser };
