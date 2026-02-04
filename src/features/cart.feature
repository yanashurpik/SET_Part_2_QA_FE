@cart
Feature: Shopping Cart Management
  As a logged-in user of Swag Labs
  I want to manage my shopping cart
  So that I can eventually checkout and buy items

  Background:
    Given I am logged in as "standard_user"

  @positive
  Scenario: Add a product to the cart
    When I add "backpack" to the cart
    Then the shopping cart badge should show 1

  @positive
  Scenario: Add multiple products to the cart
    When I add "backpack" to the cart
    And I add "bike_light" to the cart
    Then the shopping cart badge should show 2

  @positive
  Scenario: Remove a product from the cart
    When I add "backpack" to the cart
    And I remove "backpack" from the cart
    Then the shopping cart badge should not be displayed

  @positive @edge
  Scenario: Add all products to the cart
    When I add all products to the cart
    Then the shopping cart badge should show 6

  @positive @edge
  Scenario: Cart persistence during navigation
    When I add "backpack" to the cart
    And I am on the cart page
    And I navigate back to the products inventory
    Then the shopping cart badge should show 1
