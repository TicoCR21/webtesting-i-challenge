const { repair, success, fail, get } = require( './enhancer.js' );

class Item
{
  constructor( name, durability, enhancement )
  {
    this.name = name;
    this.durability = durability;
    this.enhancement = enhancement;
  }
}

describe( "Testing Enhancement Functions", () => 
{
  describe( "repair", () => 
  {
    it( "low durability", () =>
    {
      expect( repair( new Item( "sword", 10, 0 ) ) ).toEqual( new Item( "sword", 100, 0 ) );
      expect( repair( new Item( "sword", 15, 13 ) ) ).toEqual( new Item( "sword", 100, 13 ) );
      expect( repair( new Item( "sword", 29, 10 ) ) ).toEqual( new Item( "sword", 100, 10 ) );
      expect( repair( new Item( "sword", 31, 18 ) ) ).toEqual( new Item( "sword", 100, 18 ) );
      expect( repair( new Item( "sword", 36, 19 ) ) ).toEqual( new Item( "sword", 100, 19 ) );
    } );

    it( "high durability", () =>
    {
      expect( repair( new Item( "sword", 70, 0 ) ) ).toEqual( new Item( "sword", 100, 0 ) );
      expect( repair( new Item( "sword", 80, 13 ) ) ).toEqual( new Item( "sword", 100, 13 ) );
      expect( repair( new Item( "sword", 88, 10 ) ) ).toEqual( new Item( "sword", 100, 10 ) );
      expect( repair( new Item( "sword", 90, 18 ) ) ).toEqual( new Item( "sword", 100, 18 ) );
      expect( repair( new Item( "sword", 99, 19 ) ) ).toEqual( new Item( "sword", 100, 19 ) );
    } );

    it( "max durability", () =>
    {
      expect( repair( new Item( "sword", 100, 0 ) ) ).toEqual( new Item( "sword", 100, 0 ) );
      expect( repair( new Item( "sword", 110, 13 ) ) ).toEqual( new Item( "sword", 100, 13 ) );
      expect( repair( new Item( "sword", 130, 10 ) ) ).toEqual( new Item( "sword", 100, 10 ) );
      expect( repair( new Item( "sword", 500, 18 ) ) ).toEqual( new Item( "sword", 100, 18 ) );
      expect( repair( new Item( "sword", 1000, 19 ) ) ).toEqual( new Item( "sword", 100, 19 ) );
    } );
  } );

  describe( "success", () => 
  {
    it( "enhancement less than 20", () =>
    {
      expect( success( new Item( "sword", 10, 0 ) ) ).toEqual( new Item( "sword", 10, 1 ) );
      expect( success( new Item( "sword", 10, 13 ) ) ).toEqual( new Item( "sword", 10, 14 ) );
      expect( success( new Item( "sword", 10, 10 ) ) ).toEqual( new Item( "sword", 10, 11 ) );
      expect( success( new Item( "sword", 10, 18 ) ) ).toEqual( new Item( "sword", 10, 19 ) );
      expect( success( new Item( "sword", 10, 19 ) ) ).toEqual( new Item( "sword", 10, 20 ) );
    } );

    it( "enhancement greater than or equal to 20", () =>
    {
      expect( success( new Item( "sword", 10, 20 ) ) ).toEqual( new Item( "sword", 10, 20 ) );
      expect( success( new Item( "sword", 10, 21 ) ) ).toEqual( new Item( "sword", 10, 20 ) );
      expect( success( new Item( "sword", 10, 25 ) ) ).toEqual( new Item( "sword", 10, 20 ) );
      expect( success( new Item( "sword", 10, 29 ) ) ).toEqual( new Item( "sword", 10, 20 ) );
      expect( success( new Item( "sword", 10, 30 ) ) ).toEqual( new Item( "sword", 10, 20 ) );
    } );
  } );

  describe( "fail", () => 
  {
    it( "enhancement less than 15", () =>
    {
      expect( fail( new Item( "sword", 1, 0 ) ) ).toEqual( new Item( "sword", 0, 0 ) );
      expect( fail( new Item( "sword", 3, 0 ) ) ).toEqual( new Item( "sword", 0, 0 ) );
      expect( fail( new Item( "sword", 4, 2 ) ) ).toEqual( new Item( "sword", 0, 2 ) );
      expect( fail( new Item( "sword", 4, 4 ) ) ).toEqual( new Item( "sword", 0, 4 ) );
      expect( fail( new Item( "sword", 5, 4 ) ) ).toEqual( new Item( "sword", 0, 4 ) );
      expect( fail( new Item( "sword", 10, 6 ) ) ).toEqual( new Item( "sword", 5, 6 ) );
      expect( fail( new Item( "sword", 12, 10 ) ) ).toEqual( new Item( "sword", 7, 10 ) );
      expect( fail( new Item( "sword", 15, 12 ) ) ).toEqual( new Item( "sword", 10, 12 ) );
      expect( fail( new Item( "sword", 18, 13 ) ) ).toEqual( new Item( "sword", 13, 13 ) );
      expect( fail( new Item( "sword", 20, 14 ) ) ).toEqual( new Item( "sword", 15, 14 ) );
    } );

    it( "enhancement greater than or equal to 15", () =>
    {
      expect( fail( new Item( "sword", 1, 15 ) ) ).toEqual( new Item( "sword", 0, 15 ) );
      expect( fail( new Item( "sword", 3, 15 ) ) ).toEqual( new Item( "sword", 0, 15 ) );
      expect( fail( new Item( "sword", 4, 16 ) ) ).toEqual( new Item( "sword", 0, 16 ) );
      expect( fail( new Item( "sword", 4, 16 ) ) ).toEqual( new Item( "sword", 0, 16 ) );
      expect( fail( new Item( "sword", 5, 17 ) ) ).toEqual( new Item( "sword", 0, 16 ) );
      expect( fail( new Item( "sword", 10, 18 ) ) ).toEqual( new Item( "sword", 0, 17 ) );
      expect( fail( new Item( "sword", 12, 19 ) ) ).toEqual( new Item( "sword", 2, 18 ) );
      expect( fail( new Item( "sword", 15, 19 ) ) ).toEqual( new Item( "sword", 5, 18 ) );
      expect( fail( new Item( "sword", 18, 20 ) ) ).toEqual( new Item( "sword", 8, 19 ) );
      expect( fail( new Item( "sword", 20, 20 ) ) ).toEqual( new Item( "sword", 10, 19 ) );
    } );
  } );

  describe( "get", () => 
  {
    it( "enhancement equal to 0", () =>
    {
      expect( get( new Item( "sword", 1, 0 ) ) ).toEqual( new Item( "sword", 1, 0 ) );
      expect( get( new Item( "spear", 10, 0 ) ) ).toEqual( new Item( "spear", 10, 0 ) );
      expect( get( new Item( "shield", 15, 0 ) ) ).toEqual( new Item( "shield", 15, 0 ) );
      expect( get( new Item( "arrow", 20, 0 ) ) ).toEqual( new Item( "arrow", 20, 0 ) );
    } );

    it( "enhancement greater than 0", () =>
    {
      expect( get( new Item( "sword", 1, 1 ) ) ).toEqual( new Item( "[+1] sword", 1, 1 ) );
      expect( get( new Item( "spear", 10, 5 ) ) ).toEqual( new Item( "[+5] spear", 10, 5 ) );
      expect( get( new Item( "shield", 15, 10 ) ) ).toEqual( new Item( "[+10] shield", 15, 10 ) );
      expect( get( new Item( "arrow", 20, 20 ) ) ).toEqual( new Item( "[+20] arrow", 20, 20 ) );
    } );
  } );
} );