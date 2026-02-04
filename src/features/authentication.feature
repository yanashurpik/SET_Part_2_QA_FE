@authentication
Feature: User Authentication
  As a user of Swag Labs
  I want to be able to login and logout
  So that I can access the store securely

  Background:
    Given I am on the login page

  @smoke @positive
  Scenario: Successful login with standard user
    Given I am on the login page
    When I login as "standard_user"
    Then I should be redirected to the inventory page
    And I should see the products page title "Products"

  @smoke @positive
  Scenario: Successful logout
    When I login with username "standard_user" and password "secret_sauce"
    And I should be redirected to the inventory page
    When I logout
    Then I should be on the login page

  @negative
  Scenario: Login with locked out user
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see a login error message "Epic sadface: Sorry, this user has been locked out."

  @negative
  Scenario: Login with invalid username
    When I login with username "invalid_user" and password "secret_sauce"
    Then I should see a login error message "Epic sadface: Username and password do not match any user in this service"

  @negative
  Scenario: Login with invalid password
    When I login with username "standard_user" and password "wrong_password"
    Then I should see a login error message "Epic sadface: Username and password do not match any user in this service"

  @negative
  Scenario: Login with empty username
    When I login with username "" and password "secret_sauce"
    Then I should see a login error message "Epic sadface: Username is required"

  @negative
  Scenario: Login with empty password
    When I login with username "standard_user" and password ""
    Then I should see a login error message "Epic sadface: Password is required"

  @negative
  Scenario: Login with empty credentials
    When I login with username "" and password ""
    Then I should see a login error message "Epic sadface: Username is required"

  @negative @edge
  Scenario: Deny direct access to inventory without login
    When I navigate directly to the inventory page
    Then I should see a login error message "Epic sadface: You can only access '/inventory.html' when you are logged in."

  @negative @edge
  Scenario: Login is case sensitive for username
    When I login with username "Standard_User" and password "secret_sauce"
    Then I should see a login error message "Epic sadface: Username and password do not match any user in this service"
