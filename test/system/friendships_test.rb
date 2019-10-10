require "application_system_test_case"

class FriendshipsTest < ApplicationSystemTestCase
  setup do
    @friendship = friendships(:one)
  end

  test "visiting the index" do
    visit friendships_url
    assert_selector "h1", text: "Friendships"
  end

  test "creating a Friendship" do
    visit friendships_url
    click_on "New Friendship"

    click_on "Create Friendship"

    assert_text "Friendship was successfully created"
    click_on "Back"
  end

  test "updating a Friendship" do
    visit friendships_url
    click_on "Edit", match: :first

    click_on "Update Friendship"

    assert_text "Friendship was successfully updated"
    click_on "Back"
  end

  test "destroying a Friendship" do
    visit friendships_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Friendship was successfully destroyed"
  end
end
