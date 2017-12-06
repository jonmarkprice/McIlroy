const React = require('react');
const ProgramRow = require('./ProgramRow');

const Program = ({name, program}) => (
  <div className="saved-program">
    <h3 className="program-name">{name}</h3>
    <ProgramRow program={program} />
  </div>
);

const Dashboard = ({name, programs}) => (
  <div>
    <h1>Dashboard</h1>
    <h2>{name}</h2>
    <p>Hello</p>
    <h2>Programs</h2>
    <div>
    {
      programs.map((p, index) => (
        <Program key={index} name={p.name} program={p.expansion} />
      ))
    }
    </div>
  </div>
);

module.exports = Dashboard;
