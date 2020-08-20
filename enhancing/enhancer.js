const success = item => ( { ...item, enhancement: item.enhancement < 20 ? item.enhancement + 1 : 20 } ); 

const fail = item => ( { ...item, durability: Math.max( item.enhancement < 15 ? item.durability - 5 : item.durability - 10, 0 ), enhancement: item.enhancement > 16 ? --item.enhancement : item.enhancement } );
    
const repair = item => ( { ...item, durability: 100 } );

const get = item => ( { ...item, name: item.enhancement > 0 ? `[+${ item.enhancement }] ${ item.name }` : item.name } );

module.exports = { success, fail, repair, get };